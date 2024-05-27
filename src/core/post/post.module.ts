import { Module } from '@nestjs/common';
import { PostController } from '../../presentation/post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../domain/post/post.entity';
import {
  PostFileService,
  PostLinkService,
  ReadDetailPostService,
  ReadRecommendedPostService,
  RemovePostService,
} from './post.service';
import { PostRepository } from '../../domain/post/post.repository';
import { JwtAdapter } from '../../infrastructure/jwt/jwt.adapter';
import { UserRepository } from 'src/domain/user/user.repository';
import { User } from 'src/domain/user/user.entity';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [
    { provide: 'postLink', useClass: PostLinkService },
    { provide: 'postFile', useClass: PostFileService },
    { provide: 'readDetailPost', useClass: ReadDetailPostService },
    { provide: 'post out port', useClass: PostRepository },
    { provide: 'user out port', useClass: UserRepository },
    { provide: 'jwt', useClass: JwtAdapter },
    { provide: 'removePost', useClass: RemovePostService },
    { provide: 'readRecommendedPost', useClass: ReadRecommendedPostService },
  ],
  controllers: [PostController],
})
export class PostModule {}
