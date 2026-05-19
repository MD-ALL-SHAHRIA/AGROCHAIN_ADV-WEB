import { IsEnum, IsNotEmpty, IsNumber, IsString, IsArray, IsOptional, IsDateString, IsUUID, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CropType } from '../entities/inventory.entity';

export class CreateInventoryDto {
  @ApiProperty({ example: 'Premium Najirshail Balam Rice Lot' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ enum: CropType, example: CropType.RICE })
  @IsEnum(CropType)
  cropType: CropType;

  @ApiProperty({ example: 65.50, description: 'Price per unit/kg in BDT' })
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({ example: 1200, description: 'Total available quantity in kg' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: ['https://cdn.agrochain.com/lots/rice_balam.jpg'] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ example: '2026-05-18T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  harvestDate: Date;

  @ApiPropertyOptional({ example: 'Freshly harvested organic premium rice from Dinajpur region.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'farmer-uuid-goes-here', description: 'Required ONLY if an AGENT is creating this lot on behalf of a Farmer' })
  @IsUUID()
  @IsOptional()
  farmerOwnerId?: string;
}