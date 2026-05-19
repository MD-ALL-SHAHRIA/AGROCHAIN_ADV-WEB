import { Controller, Get, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorators';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Admin Dashboard & Analytics 📊')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN) 
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('revenue')
  @ApiOperation({ summary: 'Generate platform revenue & commission report' })
  getRevenue() {
    return this.adminService.getRevenueReport();
  }

  @Get('fraud-alerts')
  @ApiOperation({ summary: 'View all AI flagged payment fraud alerts' })
  getFraudAlerts() {
    return this.adminService.getFraudAlerts();
  }

  
  @Get('unverified-users')
  @ApiOperation({ summary: 'List all Agents and Transporters awaiting verification' })
  getUnverifiedUsers() {
    return this.adminService.getUnverifiedUsers();
  }

 
  @Patch('verify-user/:id')
  @ApiOperation({ summary: 'Grant verified badge to a user and trigger welcome email' })
  verifyUser(@Param('id') id: string) {
    return this.adminService.verifyUser(id);
  }

  @Patch('suspend/:id')
  @ApiOperation({ summary: 'Suspend a fraudulent user account' })
  suspendUser(@Param('id') id: string) {
    return this.adminService.suspendUser(id);
  }

  @Delete('false-lots/:id')
  @ApiOperation({ summary: 'Delete a fake or spam crop lot' })
  deleteFalseLot(@Param('id') id: string) {
    return this.adminService.deleteFalseLot(id);
  }
}