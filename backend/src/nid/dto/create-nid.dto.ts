import { IsNotEmpty, IsString, Length, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNidDto {
  @ApiProperty({ example: '1234567890', description: '10, 13 or 17 digit NID number' })
  @IsString()
  @IsNotEmpty()
  @Length(10, 17, { message: 'NID number must be between 10 and 17 digits' })
  nidNumber: string;

  @ApiProperty({ example: '/uploads/front-image.jpg' })
  @IsString()
  @IsNotEmpty()
  frontImageUrl: string;

  @ApiProperty({ example: '/uploads/back-image.jpg' })
  @IsString()
  @IsNotEmpty()
  backImageUrl: string;
}