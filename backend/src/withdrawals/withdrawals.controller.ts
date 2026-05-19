import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorators';

@ApiTags('Wallet Withdrawals 🏦')
@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Post('request')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.FARMER, UserRole.AGENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit a wallet withdrawal request' })
  request(@Body() createDto: CreateWithdrawalDto, @Request() req) {
    return this.withdrawalsService.request(createDto, req.user.id);
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all pending requests (Admin)' })
  getPending() {
    return this.withdrawalsService.getPending();
  }

  @Patch('approve/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Approve withdrawal and deduct wallet balance (Admin)' })
  approve(@Param('id') id: string, @Request() req) {
    return this.withdrawalsService.approve(id, req.user.id);
  }
}