import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    // 🏎️ Initializing premium high-performance ioredis instance [cite: 167, 179]
    this.redisClient = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
  }

  // ✨ 1. Get Cached Data
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  // ✨ 2. Set Data to Cache with Time-To-Live (TTL) [cite: 167]
  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', ttlSeconds);
  }

  // ✨ 3. Invalidate/Delete Cache Key [cite: 167]
  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  onModuleDestroy() {
    // 🔌 Gracefully shutting down connection on app termination
    this.redisClient.disconnect();
  }
}