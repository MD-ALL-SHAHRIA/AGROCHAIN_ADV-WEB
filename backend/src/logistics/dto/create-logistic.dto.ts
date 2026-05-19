import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLogisticDto {
  @ApiProperty({ example: 'order-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ example: '2026-06-01T10:00:00Z', description: 'Estimated delivery date' })
  @IsDateString()
  @IsNotEmpty()
  estimatedDelivery: Date;
}