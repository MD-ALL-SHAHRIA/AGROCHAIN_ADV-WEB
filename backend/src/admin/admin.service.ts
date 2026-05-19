import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from '../payments/entities/payment.entity';
import { FraudAlert } from '../fraud/entities/fraud.entity';
import { User } from '../users/entities/user.entity';
import { Inventory } from '../inventory/entities/inventory.entity';

@Injectable()
export class AdminService {
  private readonly logger = new Logger('AdminAnalytics 📈');

  constructor(
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(FraudAlert) private readonly fraudRepo: Repository<FraudAlert>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Inventory) private readonly inventoryRepo: Repository<Inventory>,
  ) {}

 
  async getRevenueReport() {
    this.logger.log('Generating platform revenue report...');
    
    const successfulPayments = await this.paymentRepo.find({
      where: { status: PaymentStatus.SUCCESS },
    });

    const totalTransactions = successfulPayments.length;
    const totalGrossRevenue = successfulPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);
    const platformCommission = totalGrossRevenue * 0.05;

    return {
      reportDate: new Date(),
      totalTransactions,
      totalGrossVolume: `${totalGrossRevenue.toFixed(2)} BDT`,
      netPlatformCommission: `${platformCommission.toFixed(2)} BDT`,
      message: 'Revenue aggregation successful.',
    };
  }

  
  async getFraudAlerts() {
    return await this.fraudRepo.find({
      order: { fraudScore: 'DESC' }, 
      relations: ['user'], 
    });
  }

  
  async getUnverifiedUsers() {
    return await this.userRepo.find({
      where: [
        { role: 'Agent' as any, isVerified: false }, 
        { role: 'Transporter' as any, isVerified: false },
      ],
      order: { createdAt: 'ASC' },
    });
  }

 
  async verifyUser(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found.');
    if (user.isVerified) throw new BadRequestException('User is already verified.');

    
    user.isVerified = true;
    await this.userRepo.save(user);

    this.logger.log(`User [${user.email}] has been manually VERIFIED by Admin.`);

    return { message: `Account for ${user.fullName} has been successfully verified and badge granted.` };
  }

  
  async suspendUser(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found.');

    if (!user.isActive) {
      throw new BadRequestException('User is already suspended.');
    }
    
    user.isActive = false;
    await this.userRepo.save(user);

    this.logger.warn(`User [${user.email}] has been SUSPENDED.`);
    return { message: `Account for ${user.fullName} has been successfully suspended.` };
  }

  
  async deleteFalseLot(lotId: string) {
    const lot = await this.inventoryRepo.findOne({ where: { id: lotId } });
    if (!lot) throw new NotFoundException('Crop lot not found.');
    
    await this.inventoryRepo.remove(lot);
    
    this.logger.log(`Spam lot [${lotId}] has been permanently deleted.`);
    return { message: 'False crop lot removed from the platform successfully.' };
  }
}