import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDisputeDto {
  @ApiProperty({ example: 'order-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ example: 'The rice quality is very bad and quantity is less than promised.', description: 'Detailed reason with proof links if any' })
  @IsString()
  @MinLength(10)
  reason: string;
}