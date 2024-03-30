import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TipModule } from './tip/tip.module';
import { FollowModule } from './follow/follow.module';
import { PostLikeModule } from './post-like/post-like.module';
import { TipLikeModule } from './tip-like/tip-like.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';

configDotenv();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/entity/*.js'],
      synchronize: true,
      migrations: [__dirname + '/**/migrations/*.js'],
      migrationsTableName: 'migrations',
      autoLoadEntities: true,
    }),
    UserModule,
    PostModule,
    TipModule,
    FollowModule,
    PostLikeModule,
    TipLikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
