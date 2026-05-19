import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory, LotStatus } from './entities/inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { CacheService } from '../redis/cache.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private readonly cacheService: CacheService, 
  ) {}

  
  async create(createInventoryDto: CreateInventoryDto, currentUser: any) {
    const { farmerOwnerId, ...lotData } = createInventoryDto;
    let sellerId = currentUser.id;
    let agentId: string | null = null;

    
    if (currentUser.role === UserRole.AGENT) {
      if (!farmerOwnerId) {
        throw new BadRequestException('Agents must provide a valid farmerOwnerId reference!');
      }
      sellerId = farmerOwnerId;
      agentId = currentUser.id;
    }

    const newLot = this.inventoryRepository.create({
      ...lotData,
      sellerId,
      agentId,
      status: LotStatus.AVAILABLE,
    });

    const savedLot = await this.inventoryRepository.save(newLot);
    
    
    await this.cacheService.del('cache:market:feed_all');
    
    return savedLot;
  }

  
  async getMarketFeed(query: any) {
    const { cropType } = query;
    const cacheKey = cropType ? `cache:market:feed_${cropType}` : 'cache:market:feed_all';

    
    const cachedResponse = await this.cacheService.get(cacheKey);
    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }

    
    const queryBuilder = this.inventoryRepository.createQueryBuilder('inventory')
      .leftJoinAndSelect('inventory.seller', 'seller')
      .where('inventory.status = :status', { status: LotStatus.AVAILABLE });

    if (cropType) {
      queryBuilder.andWhere('inventory.cropType = :cropType', { cropType });
    }

    const marketLots = await queryBuilder.getMany();

    
    await this.cacheService.set(cacheKey, JSON.stringify(marketLots), 60);

    return marketLots;
  }

  
  async getMyLots(userId: string) {
    return await this.inventoryRepository.find({
      where: [{ sellerId: userId }, { agentId: userId }],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const lot = await this.inventoryRepository.findOne({ where: { id } });
    if (!lot) throw new NotFoundException(`Crop lot with ID [${id}] not found.`);
    return lot;
  }

  
  async update(id: string, updateInventoryDto: UpdateInventoryDto, userId: string) {
    const lot = await this.findOne(id);

    
    if (lot.sellerId !== userId && lot.agentId !== userId) {
      throw new ForbiddenException('Unauthorized! You are not the owner of this crop lot.');
    }

    
    if (lot.status !== LotStatus.AVAILABLE) {
      throw new BadRequestException(`Cannot update this lot! It is currently locked with status: [${lot.status}]`);
    }

    await this.inventoryRepository.update(id, updateInventoryDto);
    await this.cacheService.del('cache:market:feed_all'); // Evict cache
    
    return this.findOne(id);
  }

 
  async remove(id: string, userId: string) {
    const lot = await this.findOne(id);

    if (lot.sellerId !== userId && lot.agentId !== userId) {
      throw new ForbiddenException('Unauthorized! Action rejected.');
    }

    
    if (lot.status !== LotStatus.AVAILABLE) {
      throw new BadRequestException(`Cannot remove this lot from market! Active order exists under state: [${lot.status}]`);
    }

    
    await this.inventoryRepository.update(id, { status: LotStatus.REMOVED });
    await this.cacheService.del('cache:market:feed_all');
    
    return { message: 'Crop lot successfully removed from the active marketplace.' };
  }
}