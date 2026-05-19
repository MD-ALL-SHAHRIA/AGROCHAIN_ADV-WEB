import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum FraudStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  CLEARED = 'CLEARED',
  CONFIRMED_FRAUD = 'CONFIRMED_FRAUD',
}

@Entity('fraud_alerts')
export class FraudAlert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @Column({ type: 'uuid', unique: true })
  paymentId: string;

  
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  
  @Column({ type: 'int', default: 0 })
  fraudScore: number;

  
  @Column({ type: 'jsonb', default: [] })
  flagReason: string[];

  @Column({ type: 'enum', enum: FraudStatus, default: FraudStatus.PENDING_REVIEW })
  status: FraudStatus;

 
  @Column({ type: 'uuid', nullable: true })
  reviewedById?: string;

  @CreateDateColumn()
  createdAt: Date;
}