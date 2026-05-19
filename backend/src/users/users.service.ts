import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './entities/user.entity';
import { UpdateProfileDto, ChangePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  
  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    
    
    return {
      ...user,
      
    };
  }

  
  async updateProfile(userId: string, updateData: UpdateProfileDto) {
    await this.userRepository.update(userId, updateData);
    return this.getProfile(userId);
  }

  
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'passwordHash'], 
    });

    if (!user) throw new NotFoundException('User not found');

    
    const isPasswordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(changePasswordDto.newPassword, salt);

    await this.userRepository.update(userId, { passwordHash: newPasswordHash });

    return { message: 'Password changed successfully' };
  }

  
  async getAgentProfile(agentId: string) {
    const agent = await this.userRepository.findOne({
      where: { id: agentId, role: UserRole.AGENT },
      select: ['id', 'fullName', 'city', 'ward', 'profilePhotoUrl', 'isVerified', 'createdAt'],
    });

    if (!agent) {
      throw new NotFoundException('Agent not found or user is not an agent');
    }

    
    return {
      agent,
      stats: {
        totalLotsSold: 0, 
        rating: 0,
      }
    };
  }
}