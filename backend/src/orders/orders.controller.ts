import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  UseGuards, 
  Request, 
  Query
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { UserRole } from '../users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorators';
import { OrderStatus } from './entities/order.entity';

@ApiTags('Orders - Transactions & Locking 🛒')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

 
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Place an order and instantly lock the inventory lot' })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.ordersService.create(createOrderDto, req.user.id);
  }

 
  @Get('my-orders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List orders placed by buyer. Filterable by status & date.' })
  @ApiQuery({ name: 'status', enum: OrderStatus, required: false })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-05-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-05-31' })
  getMyOrders(
    @Request() req,
    @Query('status') status?: OrderStatus,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.ordersService.getMyOrders(req.user.id, status, startDate, endDate);
  }

  
  @Get('agent-orders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.AGENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Agent views all orders received for lots they manage' })
  getAgentOrders(@Request() req) {
    return this.ordersService.getAgentOrders(req.user.id);
  }

  
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER, UserRole.AGENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Full order details including timeline and status' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.ordersService.findOne(id, req.user.id, req.user.role);
  }

  
  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.BUYER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel a pending order and unlock the inventory lot' })
  cancel(@Param('id') id: string, @Request() req) {
    return this.ordersService.cancel(id, req.user.id);
  }
}