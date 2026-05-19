import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const logger = new Logger('AgroChainBootstrap 🚀');
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  // 🌍 1. Set Global API Version Prefix
  app.setGlobalPrefix('api/v1');

  // 🌐 2. Enable CORS for Next.js Frontend
  app.enableCors({
    origin: '*', // Production e eita frontend er URL hobe
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 🛡️ 3. Enable Global Validation Guard Rails
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  // 🎨 4. Configure Swagger UI Engine
  const config = new DocumentBuilder()
    .setTitle('AgroChain - Smart Agricultural Supply Chain API')
    .setDescription('Core Backend RESTful API Ecosystem for AgroChain Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 🚀 5. Start the Application Engine
  await app.listen(port);
  logger.log(`🚀 AgroChain Engine is smoothly running on: http://localhost:${port}/api/v1`);
  logger.log(`📖 Interactive API Documentation available at: http://localhost:${port}/api/docs`);
}
bootstrap();