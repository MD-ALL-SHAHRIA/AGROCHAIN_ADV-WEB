import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToOne, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';

export enum DeliveryStatus {
  PICKUP_SCHEDULED = 'Pickup Scheduled',
  PICKED_UP = 'Picked Up',
  IN_TRANSIT = 'In Transit',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
}

@Entity('logistics')
export class Logistic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @Column({ type: 'uuid', unique: true })
  orderId: string;

  @OneToOne(() => Order, { eager: true })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  
  @Column({ type: 'uuid' })
  transporterId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'transporterId' })
  transporter: User;

  @Column({ type: 'enum', enum: DeliveryStatus, default: DeliveryStatus.PICKUP_SCHEDULED })
  currentStatus: DeliveryStatus;

 
  @Column({ type: 'jsonb', default: [] })
  trackingUpdates: Array<{ status: DeliveryStatus; timestamp: Date; note: string }>;

  @Column({ type: 'timestamp' })
  estimatedDelivery: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt?: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}