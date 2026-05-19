import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { InitiatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorators';

@ApiTags('Payments & Transactions 💸')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate payment for an order (Buyer)' })
  initiate(@Body() initiateDto: InitiatePaymentDto, @Request() req) {
    return this.paymentsService.initiate(initiateDto, req.user.id);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Webhook callback to verify payment and split commissions' })
  verify(@Body('transactionId') transactionId: string) {
    return this.paymentsService.verifyWebhook(transactionId);
  }
}