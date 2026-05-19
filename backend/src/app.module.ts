import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as Joi from 'joi';

// 📦 Feature Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'; // 🔥 FIXED: Changed to relative path
import { RedisModule } from './redis/redis.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { DisputesModule } from './disputes/disputes.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { MailModule } from './mail/mail.module';
import { UploadsModule } from './uploads/uploads.module';
import { NidModule } from './nid/nid.module';
import { LogisticsModule } from './logistics/logistics.module';
import { FraudModule } from './fraud/fraud.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    // ⚙️ Environment Configuration & Dynamic Validation Schema
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().default(6379),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('1d'),
      }),
    }),

    // 🐘 TypeORM PostgreSQL Connection Architecture
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ ডেভেলপমেন্টের জন্য ট্রু, পরবর্তীতে আমরা মাইগ্রেশনে শিফট করব
      }),
    }),

    // 🧠 BullMQ Redis Connection Setup
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
    }),

    // 📬 Registering Global Message Queues
    BullModule.registerQueue(
      { name: 'mail-queue' },        // 📧 Handle async fire-and-forget emails
      { name: 'fraud-check-queue' }, // 🤖 Handle background AI transaction scoring
    ),

    // 📂 Serve uploaded files publicly under '/uploads' route
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/',
    }),

    // ⏰ Enable NestJS Scheduler for cron jobs and periodic tasks
    ScheduleModule.forRoot(), 

    // 🚀 Application Core Modules
    AuthModule,
    UsersModule,
    RedisModule,
    InventoryModule,
    OrdersModule,
    PaymentsModule,
    WithdrawalsModule,
    DisputesModule,
    SchedulerModule,
    MailModule,
    UploadsModule, // 🔥 FIXED: Removed the duplicate entry
    NidModule,
    LogisticsModule,
    FraudModule,
    AdminModule,
  ],
})
export class AppModule {}