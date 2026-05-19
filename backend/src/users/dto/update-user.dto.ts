import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Kazi Irfanul Islam (Updated)' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'Dhaka' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Ward-10' })
  @IsOptional()
  @IsString()
  ward?: string;

  @ApiPropertyOptional({ example: 'https://cdn.agrochain.com/profile/irfan.jpg' })
  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'OldSuperSecret123!' })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'NewSuperSecret123!' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;
}