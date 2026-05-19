import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogisticsService } from './logistics.service';
import { LogisticsController } from './logistics.controller';
import { Logistic } from './entities/logistic.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Logistic, Order])],
  controllers: [LogisticsController],
  providers: [LogisticsService],
})
export class LogisticsModule {}