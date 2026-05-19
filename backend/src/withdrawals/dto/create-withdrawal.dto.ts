import { IsNotEmpty, IsNumber, IsObject, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawalDto {
  @ApiProperty({ example: 5000, description: 'Amount to withdraw in BDT' })
  @IsNumber()
  @Min(500) 
  amount: number;

  @ApiProperty({ 
    example: { provider: 'bKash', accountNo: '01700000000', type: 'Personal' },
    description: 'Bank or Mobile Banking details'
  })
  @IsObject()
  @IsNotEmpty()
  bankDetails: Record<string, any>;
}