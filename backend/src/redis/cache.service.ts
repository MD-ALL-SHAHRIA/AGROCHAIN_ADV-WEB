import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    
    this.redisClient = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      password: this.configService.get<string>('REDIS_PASS') || undefined,
    });
  }

  
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

 
  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', ttlSeconds);
  }

  
  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  onModuleDestroy() {
    
    this.redisClient.disconnect();
  }
}