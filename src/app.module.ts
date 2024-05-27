import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './core/user/user.module';
import { PostModule } from './core/post/post.module';
import { TipModule } from './core/tip/tip.module';
import { FollowModule } from './core/follow/follow.module';
import { PostLikeModule } from './core/post-like/post-like.module';
import { TipLikeModule } from './core/tip-like/tip-like.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './core/auth/auth.module';
import { RedisModule } from '@songkeys/nestjs-redis';
import { HTTPLoggerMiddleware } from './infrastructure/config/HTTP-logger.middleware';
import { redisConfig, typeORMConfig } from './infrastructure/config/db.config';
import { JwtCustomModule } from './infrastructure/jwt/jwt.module';
import { AwsModule } from './infrastructure/aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      cache: true,
    }),
    AwsModule,
    UserModule,
    PostModule,
    TipModule,
    FollowModule,
    PostLikeModule,
    TipLikeModule,
    AuthModule,
    JwtCustomModule,
    TypeOrmModule.forRoot(typeORMConfig),
    RedisModule.forRoot(redisConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HTTPLoggerMiddleware).forRoutes('*');
  }
}
