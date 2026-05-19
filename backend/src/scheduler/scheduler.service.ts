import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Order, OrderStatus } from '../orders/entities/order.entity';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger('AutoPilotEngine 🤖');

  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectQueue('mail-queue') private readonly mailQueue: Queue, 
  ) {}

  
  @Cron('0 2 * * *') 
  async closeExpiredDisputes() {
    this.logger.log('Starting dispute window expiry check...');

   
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

   
    const expiredOrders = await this.orderRepo.find({
      where: [
        { status: OrderStatus.DELIVERED, canDispute: true, updatedAt: LessThan(sevenDaysAgo) },
        { status: OrderStatus.PAID, canDispute: true, updatedAt: LessThan(sevenDaysAgo) }
      ],
    });

    if (expiredOrders.length > 0) {
      const orderIds = expiredOrders.map(order => order.id);
      await this.orderRepo.update(orderIds, { canDispute: false });
      
      this.logger.warn(`Successfully closed dispute window for ${expiredOrders.length} orders.`);
    } else {
      this.logger.log('No expired orders found today.');
    }
  }

  
  @Cron('0 8 * * 1') 
  async sendWeeklyMarketDigest() {
    this.logger.log('Initiating Weekly Market Digest email blast...');

   
    await this.mailQueue.add('weekly-digest', {
      campaign: 'Monday Fresh Harvest',
      triggeredAt: new Date().toISOString(),
    });

    this.logger.log('Weekly digest job pushed to mail-queue successfully!');
  }
}