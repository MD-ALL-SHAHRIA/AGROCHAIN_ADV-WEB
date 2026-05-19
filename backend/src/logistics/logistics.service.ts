import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logistic, DeliveryStatus } from './entities/logistic.entity';
import { CreateLogisticDto } from './dto/create-logistic.dto';
import { UpdateLogisticStatusDto } from './dto/update-logistic.dto';
import { Order, OrderStatus } from '../orders/entities/order.entity';

@Injectable()
export class LogisticsService {
  private readonly logger = new Logger('LogisticsEngine 🚚');

  
  private readonly allowedTransitions: Record<DeliveryStatus, DeliveryStatus[]> = {
    [DeliveryStatus.PICKUP_SCHEDULED]: [DeliveryStatus.PICKED_UP],
    [DeliveryStatus.PICKED_UP]: [DeliveryStatus.IN_TRANSIT],
    [DeliveryStatus.IN_TRANSIT]: [DeliveryStatus.OUT_FOR_DELIVERY],
    [DeliveryStatus.OUT_FOR_DELIVERY]: [DeliveryStatus.DELIVERED],
    [DeliveryStatus.DELIVERED]: [], // Terminal state
  };

  constructor(
    @InjectRepository(Logistic) private readonly logisticRepo: Repository<Logistic>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

 
  async createShipment(createDto: CreateLogisticDto, transporterId: string) {
    const order = await this.orderRepo.findOne({ where: { id: createDto.orderId } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== OrderStatus.PAID) {
      throw new BadRequestException('Shipment can only be created for PAID orders.');
    }

    const existingShipment = await this.logisticRepo.findOne({ where: { orderId: order.id } });
    if (existingShipment) throw new BadRequestException('Shipment already exists for this order.');

    const initialNote = 'Shipment assigned to transporter.';
    const trackingEvent = { status: DeliveryStatus.PICKUP_SCHEDULED, timestamp: new Date(), note: initialNote };

    const shipment = this.logisticRepo.create({
      orderId: order.id,
      transporterId,
      estimatedDelivery: createDto.estimatedDelivery,
      currentStatus: DeliveryStatus.PICKUP_SCHEDULED,
      trackingUpdates: [trackingEvent],
    });

    return await this.logisticRepo.save(shipment);
  }

  
  async trackShipment(orderId: string) {
    const shipment = await this.logisticRepo.findOne({ 
      where: { orderId },
      relations: ['transporter'] 
    });
    if (!shipment) throw new NotFoundException('No logistics data found for this order.');
    return shipment;
  }

  
  async updateStatus(id: string, updateDto: UpdateLogisticStatusDto, transporterId: string) {
    const shipment = await this.logisticRepo.findOne({ where: { id, transporterId } });
    if (!shipment) throw new NotFoundException('Shipment not found or unauthorized.');

    const current = shipment.currentStatus;
    const target = updateDto.status;

    
    if (!this.allowedTransitions[current].includes(target)) {
      throw new BadRequestException(`Invalid transition! Cannot move from '${current}' to '${target}'.`);
    }

   
    const newEvent = {
      status: target,
      timestamp: new Date(),
      note: updateDto.note || `Status updated to ${target}`,
    };
    shipment.trackingUpdates.push(newEvent);
    shipment.currentStatus = target;

    if (target === DeliveryStatus.DELIVERED) {
      shipment.deliveredAt = new Date();
      await this.orderRepo.update(shipment.orderId, { status: OrderStatus.DELIVERED });
      this.logger.log(`Order [${shipment.orderId}] has been successfully DELIVERED.`);
    }

    return await this.logisticRepo.save(shipment);
  }
}