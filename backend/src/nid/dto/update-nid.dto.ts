import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NidStatus } from '../entities/nid.entity';

export class UpdateNidDto {
  @ApiProperty({ enum: NidStatus, example: NidStatus.APPROVED })
  @IsEnum(NidStatus)
  @IsNotEmpty()
  status: NidStatus;

  @ApiProperty({ example: 'Everything looks perfectly authentic.' })
  @IsString()
  @IsOptional()
  adminNotes?: string;
}