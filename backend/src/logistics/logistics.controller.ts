import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LogisticsService } from './logistics.service';
import { CreateLogisticDto } from './dto/create-logistic.dto';
import { UpdateLogisticStatusDto } from './dto/update-logistic.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorators';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Logistics & Tracking 🚚')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('logistics')
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Post('shipment')
  @Roles(UserRole.TRANSPORTER)
  @ApiOperation({ summary: 'Create a new shipment for a PAID order (Transporter)' })
  create(@Body() createLogisticDto: CreateLogisticDto, @Request() req) {
    return this.logisticsService.createShipment(createLogisticDto, req.user.id);
  }

  @Get('track/:orderId')
  @Roles(UserRole.BUYER, UserRole.TRANSPORTER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Live track a shipment using Order ID' })
  track(@Param('orderId') orderId: string) {
    return this.logisticsService.trackShipment(orderId);
  }

  @Patch('status/:id')
  @Roles(UserRole.TRANSPORTER)
  @ApiOperation({ summary: 'Update delivery status (State Machine Enforced)' })
  updateStatus(@Param('id') id: string, @Body() updateDto: UpdateLogisticStatusDto, @Request() req) {
    return this.logisticsService.updateStatus(id, updateDto, req.user.id);
  }
}