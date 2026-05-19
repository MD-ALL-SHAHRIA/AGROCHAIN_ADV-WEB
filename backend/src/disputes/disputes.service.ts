import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute, DisputeStatus } from './entities/dispute.entity';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { ResolveDisputeDto, DisputeAction } from './dto/resolve-dispute.dto';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DisputesService {
  private readonly logger = new Logger('DisputesEngine ⚖️');

  constructor(
    @InjectRepository(Dispute)
    private readonly disputeRepo: Repository<Dispute>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createDto: CreateDisputeDto, buyerId: string) {
    const order = await this.orderRepo.findOne({
      where: { id: createDto.orderId, buyerId },
    });

    if (!order) throw new NotFoundException('Order not found.');

    if (
      order.status === OrderStatus.PENDING ||
      order.status === OrderStatus.CANCELLED
    ) {
      throw new BadRequestException(
        'Cannot dispute an unpaid or cancelled order.',
      );
    }
    if (!order.canDispute) {
      throw new BadRequestException(
        'Dispute window for this order has expired (7 days passed).',
      );
    }

    const existingDispute = await this.disputeRepo.findOne({
      where: { orderId: order.id },
    });
    if (existingDispute) {
      throw new BadRequestException(
        'A dispute is already open for this order.',
      );
    }

    const dispute = this.disputeRepo.create({
      orderId: order.id,
      buyerId,
      reason: createDto.reason,
      status: DisputeStatus.OPEN,
    });

    return await this.disputeRepo.save(dispute);
  }

  async findAllOpen() {
    return await this.disputeRepo.find({
      where: { status: DisputeStatus.OPEN },
      relations: ['buyer', 'order'],
      order: { createdAt: 'ASC' },
    });
  }

  async resolve(id: string, resolveDto: ResolveDisputeDto, adminId: string) {
    const dispute = await this.disputeRepo.findOne({
      where: { id },
      relations: ['order', 'order.inventory'],
    });

    if (!dispute) throw new NotFoundException('Dispute not found.');
    if (dispute.status !== DisputeStatus.OPEN) {
      throw new BadRequestException(
        `Dispute is already resolved as [${dispute.status}].`,
      );
    }

    if (resolveDto.action === DisputeAction.REFUND) {
      const platformCommissionRate = 0.05;
      const agentCommissionRate = 0.1;
      const totalAmount = Number(dispute.order.totalAmount);

      const platformCut = totalAmount * platformCommissionRate;
      const remainingForSeller = totalAmount - platformCut;

      let farmerDeduction = remainingForSeller;
      let agentDeduction = 0;

      if (dispute.order.inventory.agentId) {
        agentDeduction = remainingForSeller * agentCommissionRate;
        farmerDeduction = remainingForSeller - agentDeduction;

        await this.userRepo.decrement(
          { id: dispute.order.inventory.agentId },
          'walletBalance',
          agentDeduction,
        );
      }

      await this.userRepo.decrement(
        { id: dispute.order.inventory.sellerId },
        'walletBalance',
        farmerDeduction,
      );

      await this.userRepo.increment(
        { id: dispute.buyerId },
        'walletBalance',
        totalAmount,
      );

      this.logger.warn(
        `Refund Processed for Order [${dispute.orderId}]. Funds reversed.`,
      );
    }

    await this.disputeRepo.update(id, {
      status:
        resolveDto.action === DisputeAction.REFUND
          ? DisputeStatus.REFUNDED
          : DisputeStatus.REJECTED,
      resolutionNotes: resolveDto.resolutionNotes,
      resolvedById: adminId,
    });

    await this.orderRepo.update(dispute.orderId, { canDispute: false });

    return {
      message: `Dispute has been strictly ${resolveDto.action}. Wallet updated if refunded.`,
    };
  }
}
