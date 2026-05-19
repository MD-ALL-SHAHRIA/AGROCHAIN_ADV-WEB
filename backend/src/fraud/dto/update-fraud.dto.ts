import { PartialType } from '@nestjs/swagger';
import { CreateFraudDto } from './create-fraud.dto';

export class UpdateFraudDto extends PartialType(CreateFraudDto) {}
