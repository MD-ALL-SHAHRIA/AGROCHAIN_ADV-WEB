import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FraudService } from './fraud.service';
import { CreateFraudDto } from './dto/create-fraud.dto';
import { UpdateFraudDto } from './dto/update-fraud.dto';

@Controller('fraud')
export class FraudController {
  constructor(private readonly fraudService: FraudService) {}

  @Post()
  create(@Body() createFraudDto: CreateFraudDto) {
    return this.fraudService.create(createFraudDto);
  }

  @Get()
  findAll() {
    return this.fraudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fraudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFraudDto: UpdateFraudDto) {
    return this.fraudService.update(+id, updateFraudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fraudService.remove(+id);
  }
}
