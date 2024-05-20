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
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { HTTPLoggerMiddleware } from './infrastructure/config/HTTP-logger.middleware';
import { redisConfig, typeORMConfig } from './infrastructure/config/db.config';
import { JwtCustomModule } from './infrastructure/jwt/jwt.module';
import { Credentials, S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';

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
    JwtCustomModule,
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: 'ap-northeast-2',
        credentials: new Credentials({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          accessKeyId: process.env.AWS_ACCESS_KEY!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          secretAccessKey: process.env.AWS_SECRET_KEY!,
        }),
      },
      services: [S3],
    }),
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
