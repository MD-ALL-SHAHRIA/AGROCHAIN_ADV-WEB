import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum NidStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

@Entity('nid_records')
export class Nid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, { eager: true }) 
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ unique: true })
  nidNumber: string;

  @Column()
  frontImageUrl: string;

  @Column()
  backImageUrl: string;

  @Column({ type: 'enum', enum: NidStatus, default: NidStatus.PENDING })
  status: NidStatus;

  @Column({ type: 'uuid', nullable: true })
  verifiedById?: string; 

  @Column({ type: 'text', nullable: true })
  adminNotes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}