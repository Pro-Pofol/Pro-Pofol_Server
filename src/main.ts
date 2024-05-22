import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/filter/exception.filter';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'OA-TOKEN',
      'Content-Length',
      'X-Requested-With',
      'Accept',
      'Accept-Encoding',
      'Accept-Language',
      'Accept-Headers',
      'User-Agent',
      'Host',
      'Connection',
    ],
    exposedHeaders: ['Authorization', 'OA-TOKEN'],
  });

  const port = Number(process.env.PORT);
  await app.listen(port);
  console.log(`Application is running on :${port}`);
}
bootstrap().then();
