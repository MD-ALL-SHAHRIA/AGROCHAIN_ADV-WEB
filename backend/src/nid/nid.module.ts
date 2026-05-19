import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NidService } from './nid.service';
import { NidController } from './nid.controller';
import { Nid } from './entities/nid.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nid, User])],
  controllers: [NidController],
  providers: [NidService],
})
export class NidModule {}