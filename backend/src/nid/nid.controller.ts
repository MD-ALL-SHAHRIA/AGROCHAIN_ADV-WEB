import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NidService } from './nid.service';
import { CreateNidDto } from './dto/create-nid.dto';
import { UpdateNidDto } from './dto/update-nid.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorators';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('KYC & NID Verification 🆔')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('nid')
export class NidController {
  constructor(private readonly nidService: NidService) {}

 
  @Post('submit')
  @Roles(UserRole.AGENT, UserRole.TRANSPORTER, UserRole.FARMER) 
  @ApiOperation({ summary: 'Submit NID details and images (Agent/Transporter)' })
  submit(@Body() createNidDto: CreateNidDto, @Request() req) {
    return this.nidService.submit(createNidDto, req.user.id);
  }

  
  @Get('status')
  @Roles(UserRole.AGENT, UserRole.TRANSPORTER, UserRole.FARMER)
  @ApiOperation({ summary: 'Check own NID verification status (Pending/Verified/Rejected)' })
  getStatus(@Request() req) {
    return this.nidService.getStatus(req.user.id);
  }

  
  @Get('admin/list')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'List all submitted NID records (Admin)' })
  getAdminList() {
    return this.nidService.getPendingRequests();
  }

  
  @Patch('admin/review/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin manually approves or rejects a borderline NID submission' })
  reviewNid(@Param('id') id: string, @Body() updateNidDto: UpdateNidDto, @Request() req) {
    return this.nidService.verifyRequest(id, updateNidDto, req.user.id);
  }
}