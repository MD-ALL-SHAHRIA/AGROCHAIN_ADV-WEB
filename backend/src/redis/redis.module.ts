import { Module, Global } from '@nestjs/common';
import { CacheService } from './cache.service';

@Global() // 🌍 Global ডেকোরেটর দিলে অন্য কোনো মডিউলে বারবার ইমপোর্ট করা লাগবে না
@Module({
  providers: [CacheService],
  exports: [CacheService], // 🚀 Exporting to empower other feature modules 
})
export class RedisModule {}