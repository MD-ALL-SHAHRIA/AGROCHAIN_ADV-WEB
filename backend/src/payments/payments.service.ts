import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { InitiatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger('PaymentsEngine 💸');

  constructor(
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    
    
    @InjectQueue('fraud-check-queue') private readonly fraudQueue: Queue,
    @InjectQueue('mail-queue') private readonly mailQueue: Queue,
  ) {}

  
  async initiate(initiateDto: InitiatePaymentDto, buyerId: string) {
    const order = await this.orderRepository.findOne({ 
      where: { id: initiateDto.orderId, buyerId },
      relations: ['inventory']
    });

    if (!order) throw new NotFoundException('Order not found or unauthorized.');
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException(`Order is already in [${order.status}] state.`);
    }

    
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const payment = this.paymentRepository.create({
      orderId: order.id,
      buyerId,
      amount: order.totalAmount,
      transactionId,
      status: PaymentStatus.PENDING,
    });

    await this.paymentRepository.save(payment);

    return {
      message: 'Payment initiated successfully.',
      gatewayUrl: `http://localhost:3000/mock-payment?txn=${transactionId}`, 
      transactionId,
    };
  }

  
  async verifyWebhook(transactionId: string) {
    const payment = await this.paymentRepository.findOne({ where: { transactionId } });
    if (!payment) throw new NotFoundException('Transaction not found.');
    if (payment.status === PaymentStatus.SUCCESS) throw new BadRequestException('Already verified.');

    const order = await this.orderRepository.findOne({ 
      where: { id: payment.orderId },
      relations: ['inventory']
    });

    if (!order) throw new NotFoundException('Order not found for this payment.');
    
   
    await this.paymentRepository.update(payment.id, { status: PaymentStatus.SUCCESS, paidAt: new Date() });
    await this.orderRepository.update(order.id, { status: OrderStatus.PAID });

    
    const platformCommissionRate = 0.05; 
    const agentCommissionRate = 0.10;    

    const totalAmount = Number(payment.amount);
    const platformCut = totalAmount * platformCommissionRate;
    const remainingForSeller = totalAmount - platformCut;

    if (order.inventory.agentId) {
      
      const agentCut = remainingForSeller * agentCommissionRate;
      const farmerCut = remainingForSeller - agentCut;

      await this.userRepository.increment({ id: order.inventory.sellerId }, 'walletBalance', farmerCut);
      await this.userRepository.increment({ id: order.inventory.agentId }, 'walletBalance', agentCut);
      this.logger.log(`Split completed: Farmer got ${farmerCut}, Agent got ${agentCut}`);
    } else {
     
      await this.userRepository.increment({ id: order.inventory.sellerId }, 'walletBalance', remainingForSeller);
      this.logger.log(`Direct sale: Farmer got ${remainingForSeller}`);
    }

    
    await this.fraudQueue.add('score-transaction', {
      paymentId: payment.id,
      userId: payment.buyerId,
      amount: payment.amount,
      transactionId: payment.transactionId,
    });

    
    await this.mailQueue.add('payment-received', {
      orderId: order.id,
      buyerId: payment.buyerId,
      amount: payment.amount,
    });

    return { message: 'Payment verified, wallets credited, and async jobs enqueued.' };
  }
}

