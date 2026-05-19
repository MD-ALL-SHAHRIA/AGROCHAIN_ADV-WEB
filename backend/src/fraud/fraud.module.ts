import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { FraudService } from './fraud.service';
import { FraudController } from './fraud.controller';
import { FraudAlert } from './entities/fraud.entity';
import { FraudWorker } from './fraud.worker';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { Withdrawal } from '../withdrawals/entities/withdrawal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FraudAlert, User, Order, Withdrawal]),
    
    BullModule.registerQueue({ name: 'fraud-check-queue' }),
  ],
  controllers: [FraudController],
  providers: [FraudService, FraudWorker], 
})
export class FraudModule {}