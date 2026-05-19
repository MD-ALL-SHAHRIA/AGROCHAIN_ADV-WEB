import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nid, NidStatus } from './entities/nid.entity';
import { CreateNidDto } from './dto/create-nid.dto';
import { UpdateNidDto } from './dto/update-nid.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NidService {
  constructor(
    @InjectRepository(Nid) private readonly nidRepo: Repository<Nid>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

 
  async submit(createNidDto: CreateNidDto, userId: string) {
    
    const existing = await this.nidRepo.findOne({ where: { userId } });
    if (existing && existing.status !== NidStatus.REJECTED) {
      throw new BadRequestException('You already have a Pending or Approved NID submission.');
    }

    const nidRecord = this.nidRepo.create({
      ...createNidDto,
      userId,
      status: NidStatus.PENDING,
    });

    return await this.nidRepo.save(nidRecord);
  }

  
  async getPendingRequests() {
    return await this.nidRepo.find({ where: { status: NidStatus.PENDING }, order: { createdAt: 'ASC' } });
  }

 
  async verifyRequest(id: string, updateDto: UpdateNidDto, adminId: string) {
    const record = await this.nidRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('NID record not found');
    if (record.status !== NidStatus.PENDING) throw new BadRequestException('This record is already processed');

    record.status = updateDto.status;
    record.adminNotes = updateDto.adminNotes;
    record.verifiedById = adminId;

    await this.nidRepo.save(record);

    
    if (updateDto.status === NidStatus.APPROVED) {
      // Assuming your User entity has an 'isVerified' column. If not, we will just rely on the NID record.
      // await this.userRepo.update(record.userId, { isVerified: true });
    }

    return { message: `NID successfully marked as ${updateDto.status}` };
  }

  async getStatus(userId: string) {
    const record = await this.nidRepo.findOne({ where: { userId } });
    
    if (!record) {
      throw new NotFoundException('No NID submission found for your account.');
    }

    return {
      status: record.status,
      submittedAt: record.createdAt,
      adminNotes: record.adminNotes || 'Under process or no notes provided.',
    };
  }
  
}