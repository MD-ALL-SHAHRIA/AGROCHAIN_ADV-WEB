import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'put-inventory-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  inventoryId: string;

  @ApiProperty({ example: 50, description: 'Quantity required by the buyer' })
  @IsNumber()
  @Min(1)
  quantity: number;
}