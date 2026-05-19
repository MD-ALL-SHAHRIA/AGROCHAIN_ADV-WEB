import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { InventoryService } from '../inventory/inventory.service';
import { LotStatus } from '../inventory/entities/inventory.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    
    private readonly inventoryService: InventoryService,
  ) {}

  
  async create(createOrderDto: CreateOrderDto, buyerId: string) {
    const { inventoryId, quantity } = createOrderDto;

    
    const lot = await this.inventoryService.findOne(inventoryId);

    
    if (lot.status !== LotStatus.AVAILABLE) {
      throw new BadRequestException(`This crop lot is no longer available. Current status: ${lot.status}`);
    }

    
    if (quantity > lot.quantity) {
      throw new BadRequestException(`Requested quantity (${quantity}) exceeds available stock (${lot.quantity}).`);
    }

    
    const totalAmount = lot.price * quantity;

    
    const order = this.orderRepository.create({
      buyerId,
      inventoryId,
      quantity,
      totalAmount,
      status: OrderStatus.PENDING, 
    });

    const savedOrder = await this.orderRepository.save(order);

    
    await this.inventoryService.update(inventoryId, { status: LotStatus.RESERVED } as any, lot.sellerId);

    return {
      message: 'Order placed successfully! Lot is now locked for you.',
      order: savedOrder,
    };
  }

  
  async getMyOrders(buyerId: string, status?: OrderStatus, startDate?: string, endDate?: string) {
    const queryBuilder = this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.inventory', 'inventory')
      .where('order.buyerId = :buyerId', { buyerId });

   
    if (status) {
      queryBuilder.andWhere('order.status = :status', { status });
    }

    
    if (startDate && endDate) {
      queryBuilder.andWhere('order.createdAt BETWEEN :startDate AND :endDate', { 
        startDate, 
        endDate: `${endDate} 23:59:59` 
      });
    }

    queryBuilder.orderBy('order.createdAt', 'DESC');
    return await queryBuilder.getMany();
  }

  
  async getAgentOrders(agentId: string) {
    return await this.orderRepository.find({
      where: { inventory: { agentId } }, 
      relations: ['inventory'],
      order: { createdAt: 'DESC' },
    });
  }

 
  async findOne(id: string, userId: string, role: string) {
    const order = await this.orderRepository.findOne({ where: { id } });
    
    if (!order) throw new NotFoundException('Order not found!');

   
    if (role === 'buyer' && order.buyerId !== userId) {
      throw new ForbiddenException('You do not have permission to view this order.');
    }

    return order;
  }

  
  async cancel(id: string, buyerId: string) {
    const order = await this.orderRepository.findOne({ where: { id, buyerId }, relations: ['inventory'] });

    if (!order) throw new NotFoundException('Order not found or you are not the owner.');

    
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException(`Cannot cancel order. Current status is already: ${order.status}`);
    }

    
    await this.orderRepository.update(id, { status: OrderStatus.CANCELLED });

    
    const lotOwner = order.inventory.sellerId;
    await this.inventoryService.update(order.inventoryId, { status: LotStatus.AVAILABLE } as any, lotOwner);

    return { message: 'Order has been cancelled successfully. The crop lot is available on the market again.' };
  }
}