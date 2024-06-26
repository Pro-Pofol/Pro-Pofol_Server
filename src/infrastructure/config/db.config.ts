import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModuleOptions } from '@songkeys/nestjs-redis';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/entity/*.js'],
  migrations: [__dirname + '/**/migrations/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false,
  autoLoadEntities: true,
  logging: true,
  timezone: '+9:00',
};

export const redisConfig: RedisModuleOptions = {
  readyLog: true,
  config: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
};
