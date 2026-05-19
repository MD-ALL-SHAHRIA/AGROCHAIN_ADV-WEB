import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { SchedulerService } from './scheduler.service';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    BullModule.registerQueue({ name: 'mail-queue' }), 
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}