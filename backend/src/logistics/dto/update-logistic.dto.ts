import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatus } from '../entities/logistic.entity';

export class UpdateLogisticStatusDto {
  @ApiProperty({ enum: DeliveryStatus, example: DeliveryStatus.PICKED_UP })
  @IsEnum(DeliveryStatus)
  @IsNotEmpty()
  status: DeliveryStatus;

  @ApiProperty({ example: 'Package collected from farmer in Bogura.', description: 'Location or action note' })
  @IsString()
  @IsOptional()
  note?: string;
}