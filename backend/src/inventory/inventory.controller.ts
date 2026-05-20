import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Query, 
  Request 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorators';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Inventory - Crop Lot Management 🌾')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.FARMER, UserRole.AGENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new crop lot for sale (Farmer/Agent only)' })
  create(@Body() createInventoryDto: CreateInventoryDto, @Request() req) {
    return this.inventoryService.create(createInventoryDto, req.user);
  }


  @Get()
  @ApiOperation({ summary: 'Public live market feed (Cached response 60s)' })
  getMarketFeed(@Query() query: any) {
    return this.inventoryService.getMarketFeed(query);
  }

  @Get('my-lots')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.FARMER, UserRole.AGENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all lots created by the authenticated user' })
  getMyLots(@Request() req) {
    return this.inventoryService.getMyLots(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'View full details of a single crop lot' })
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.FARMER, UserRole.AGENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update crop lot parameters (Title, Price, Qty)' })
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto, @Request() req) {
    return this.inventoryService.update(id, updateInventoryDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.FARMER, UserRole.AGENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove own lot from the active marketplace' })
  remove(@Param('id') id: string, @Request() req) {
    return this.inventoryService.remove(id, req.user.id);
  }
}