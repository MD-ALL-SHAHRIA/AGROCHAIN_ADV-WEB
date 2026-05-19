import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

// 🌾 Supported Crop Categories as per system spec
export enum CropType {
  RICE = 'rice',
  WHEAT = 'wheat',
  POTATO = 'potato',
  VEGETABLES = 'vegetables',
  FRUITS = 'fruits',
}

// 🔄 Lot Lifecycle State Machine states
export enum LotStatus {
  AVAILABLE = 'Available',
  RESERVED = 'Reserved',
  SOLD = 'Sold',
  REMOVED = 'Removed',
}

@Entity('inventories')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'enum', enum: CropType })
  cropType: CropType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'timestamp' })
  harvestDate: Date;

  @Column({ type: 'enum', enum: LotStatus, default: LotStatus.AVAILABLE })
  status: LotStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  // 👤 The actual owner of the crop (Farmer)
  @Column({ type: 'uuid' })
  sellerId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  // 🧑‍🌾 Optional Intermediary Agent ID who listed it
  @Column({ type: 'uuid', nullable: true })
  agentId?: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'agentId' })
  agent?: User | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}