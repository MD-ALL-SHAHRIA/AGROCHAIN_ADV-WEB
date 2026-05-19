import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Withdrawal, WithdrawalStatus } from './entities/withdrawal.entity';
import { User } from '../users/entities/user.entity';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';

@Injectable()
export class WithdrawalsService {
  constructor(
    @InjectRepository(Withdrawal) private readonly withdrawalRepo: Repository<Withdrawal>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async request(createDto: CreateWithdrawalDto, userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    
    if (!user) throw new NotFoundException('User account not found.');
    
    
    if (Number(user.walletBalance) < createDto.amount) {
      throw new BadRequestException(`Insufficient wallet balance. You have: ${user.walletBalance}`);
    }

    const request = this.withdrawalRepo.create({
      userId,
      amount: createDto.amount,
      bankDetails: createDto.bankDetails,
    });

    return await this.withdrawalRepo.save(request);
  }

  async getPending() {
    return await this.withdrawalRepo.find({
      where: { status: WithdrawalStatus.PENDING },
      relations: ['user'],
      order: { requestedAt: 'ASC' },
    });
  }

  async approve(id: string, adminId: string) {
    const request = await this.withdrawalRepo.findOne({ where: { id } });
    if (!request) throw new NotFoundException('Request not found.');
    if (request.status !== WithdrawalStatus.PENDING) throw new BadRequestException('Request already processed.');

    
    await this.userRepo.decrement({ id: request.userId }, 'walletBalance', request.amount);

    
    await this.withdrawalRepo.update(id, {
      status: WithdrawalStatus.APPROVED,
      processedAt: new Date(),
      processedBy: adminId,
    });

    

    return { message: 'Withdrawal approved successfully.' };
  }
}