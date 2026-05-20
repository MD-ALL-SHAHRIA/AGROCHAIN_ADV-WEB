

import { 
  ConflictException, 
  Injectable, 
  UnauthorizedException, 
  NotFoundException, 
  BadRequestException 
} from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectQueue } from '@nestjs/bullmq'; 
import { Queue } from 'bullmq';               

import { User } from '../users/entities/user.entity';
import { Otp } from './entities/otp.entity'; 
import { 
  RegisterDto, 
  LoginDto, 
  ForgotPasswordDto, 
  ResetPasswordDto 
} from './dto/auth.dto'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    
    private readonly jwtService: JwtService,

    
    @InjectQueue('mail-queue') private readonly mailQueue: Queue,
  ) {}

  
  async register(registerDto: RegisterDto) {
    const { email, phone, password, role, fullName } = registerDto;

    
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });

    if (existingUser) {
      throw new ConflictException('User with this email or phone already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      fullName,
      email,
      phone,
      role,
      passwordHash,
      isVerified: role === 'buyer' ? true : false, 
    });

    await this.userRepository.save(newUser);

    return {
      message: 'User registered successfully!',
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'passwordHash', 'role', 'fullName', 'isActive'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account has been suspended by Admin. Access denied!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful!',
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }


  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('No account found with this email address.');
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
   
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const otpRecord = this.otpRepository.create({
      email,
      code: otpCode,
      expiresAt,
    });
    await this.otpRepository.save(otpRecord);

    
    await this.mailQueue.add('forgot-password', {
      email,
      otp: otpCode,
    });

    return {
      message: 'Password reset OTP has been sent to your email successfully! 📬',
    };
  }


  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, otp, newPassword } = resetPasswordDto;

    const otpRecord = await this.otpRepository.findOne({
      where: { email, code: otp, isUsed: false },
      order: { createdAt: 'DESC' },
    });

    if (!otpRecord) {
      throw new BadRequestException('Invalid OTP code or email address.');
    }

    if (new Date() > otpRecord.expiresAt) {
      throw new BadRequestException('This OTP code has expired. Please request a new one.');
    }

    // Verify user existence
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User no longer exists.');

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await this.userRepository.update(user.id, { passwordHash: hashedNewPassword });
    await this.otpRepository.update(otpRecord.id, { isUsed: true });

    return {
      message: 'Your password has been reset successfully! You can now login with your new credentials.',
    };
  }
}