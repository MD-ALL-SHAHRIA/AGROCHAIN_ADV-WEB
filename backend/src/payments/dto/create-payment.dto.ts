import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InitiatePaymentDto {
  @ApiProperty({ example: 'put-order-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;
}