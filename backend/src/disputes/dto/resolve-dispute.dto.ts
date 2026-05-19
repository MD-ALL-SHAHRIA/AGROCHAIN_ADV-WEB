import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DisputeStatus } from '../entities/dispute.entity';

export enum DisputeAction {
  REFUND = 'Refunded',
  REJECT = 'Rejected',
}

export class ResolveDisputeDto {
  @ApiProperty({ enum: DisputeAction, example: DisputeAction.REFUND })
  @IsEnum(DisputeAction)
  @IsNotEmpty()
  action: DisputeAction;

  @ApiProperty({ example: 'Buyer provided valid proof. Reversing the transaction.' })
  @IsString()
  @IsNotEmpty()
  resolutionNotes: string;
}