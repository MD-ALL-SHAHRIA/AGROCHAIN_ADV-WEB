import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { InventoryModule } from '../inventory/inventory.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]), 
    InventoryModule, 
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}