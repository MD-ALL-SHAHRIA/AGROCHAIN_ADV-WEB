import { Injectable } from '@nestjs/common';
import { CreateFraudDto } from './dto/create-fraud.dto';
import { UpdateFraudDto } from './dto/update-fraud.dto';

@Injectable()
export class FraudService {
  create(createFraudDto: CreateFraudDto) {
    return 'This action adds a new fraud';
  }

  findAll() {
    return `This action returns all fraud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fraud`;
  }

  update(id: number, updateFraudDto: UpdateFraudDto) {
    return `This action updates a #${id} fraud`;
  }

  remove(id: number) {
    return `This action removes a #${id} fraud`;
  }
}
