import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Payment } from '../payments/entities/payment.entity';
import { FraudAlert } from '../fraud/entities/fraud.entity';
import { User } from '../users/entities/user.entity';
import { Inventory } from '../inventory/entities/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, FraudAlert, User, Inventory]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}