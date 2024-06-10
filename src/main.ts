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
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'content-type',
      'Content-Type',
      'oa-token',
      'OA-TOKEN',
      'content-length',
      'Content-Length',
      'x-requested-with',
      'X-Requested-With',
      'accept',
      'Accept',
      'accept-encoding',
      'Accept-Encoding',
      'accept-language',
      'Accept-Language',
      'accept-headers',
      'Accept-Headers',
      'user-agent',
      'User-Agent',
      'host',
      'Host',
      'connection',
      'Connection',
      'authorization',
      'Authorization',
      'x-not-using-xquare-auth',
      'X-Not-Using-Xquare-Auth',
    ],
    exposedHeaders: [
      'Authorization',
      'authorization',
      'OA-TOKEN',
      'oa-token',
      'Location',
      'location',
      'access-control-allow-origin',
      'Access-Control-Allow-Origin',
      'access-control-allow-headers',
      'Access-Control-Allow-Headers',
      'access-control-allow-methods',
      'Access-Control-Allow-Methods',
      'access-control-allow-credentials',
      'Access-Control-Allow-Credentials',
    ],
  });

  const port = Number(process.env.PORT);
  await app.listen(port);
  console.log(`Application is running on :${port}`);
}
bootstrap().then();
