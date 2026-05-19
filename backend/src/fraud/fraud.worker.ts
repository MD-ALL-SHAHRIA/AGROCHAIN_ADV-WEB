import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { FraudAlert, FraudStatus } from './entities/fraud.entity';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { Withdrawal } from '../withdrawals/entities/withdrawal.entity';

@Processor('fraud-check-queue')
export class FraudWorker extends WorkerHost { 
  private readonly logger = new Logger('AI-FraudEngine 🤖');

  constructor(
    @InjectRepository(FraudAlert) private readonly fraudRepo: Repository<FraudAlert>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Withdrawal) private readonly withdrawalRepo: Repository<Withdrawal>,
  ) {
    super();
  }

  async process(job: Job<{ paymentId: string; userId: string; amount: number }>): Promise<any> {
    const { paymentId, userId, amount } = job.data;
    this.logger.log(`Scanning transaction [${paymentId}] for User: ${userId}`);

    let fraudScore = 0;
    const flagReason: string[] = [];

   
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (user) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (new Date(user.createdAt) > sevenDaysAgo) {
        fraudScore += 20;
        flagReason.push('NEW_ACCOUNT_ACTIVITY');
      }
    }

   
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    const recentOrdersCount = await this.orderRepo.count({
      where: { buyerId: userId, createdAt: MoreThan(twentyFourHoursAgo) },
    });
    
    if (recentOrdersCount > 5) {
      fraudScore += 20;
      flagReason.push('HIGH_FREQUENCY_ORDERS_24H');
    }

   
    if (amount > 50000) {
      fraudScore += 30;
      flagReason.push('AMOUNT_SPIKE_DETECTED');
    }

    
    const thirtyMinsAgo = new Date();
    thirtyMinsAgo.setMinutes(thirtyMinsAgo.getMinutes() - 30);

    const recentWithdrawals = await this.withdrawalRepo.count({
      where: { userId: userId, requestedAt: MoreThan(thirtyMinsAgo) },
    });

    if (recentWithdrawals > 0) {
      fraudScore += 15;
      flagReason.push('RAPID_WITHDRAWAL_ATTEMPT');
    }

    this.logger.log(`Score for [${paymentId}]: ${fraudScore}/100`);

    
    if (fraudScore > 0) {
      const alert = this.fraudRepo.create({
        paymentId,
        userId,
        fraudScore,
        flagReason,
        status: fraudScore > 75 ? FraudStatus.PENDING_REVIEW : FraudStatus.CLEARED,
      });
      await this.fraudRepo.save(alert);

      if (fraudScore > 75) {
        this.logger.warn(`HIGH FRAUD RISK DETECTED: Alert saved for Admin Review!`);
      }
    }

    return { status: 'Scoring Complete', score: fraudScore };
  }
}