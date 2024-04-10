import { Module } from '@nestjs/common';
import { UserModule } from './core/user/user.module';
import { PostModule } from './core/post/post.module';
import { TipModule } from './core/tip/tip.module';
import { FollowModule } from './core/follow/follow.module';
import { PostLikeModule } from './core/post-like/post-like.module';
import { TipLikeModule } from './core/tip-like/tip-like.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './core/auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import {
  redisConfig,
  typeORMConfig,
} from './infrastructure/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
      cache: true,
    }),
    UserModule,
    PostModule,
    TipModule,
    FollowModule,
    PostLikeModule,
    TipLikeModule,
    AuthModule,
    TypeOrmModule.forRoot(typeORMConfig),
    RedisModule.forRoot(redisConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
