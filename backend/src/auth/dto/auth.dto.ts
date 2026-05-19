import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, IsPhoneNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'Kazi Irfanul Islam' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({ example: 'irfan@agrochain.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+8801700000000' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'SuperSecret123!' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.BUYER })
  @IsEnum(UserRole)
  role: UserRole;
}

export class LoginDto {
  @ApiProperty({ example: 'irfan@agrochain.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SuperSecret123!' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'irfan@agrochain.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'irfan@agrochain.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: '6-digit OTP code received via email' })
  @IsString()
  @MinLength(6)
  otp: string;

  @ApiProperty({ example: 'NewSuperSecretPassword2026!' })
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;
}