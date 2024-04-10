import { Module } from '@nestjs/common';
import { PostLikeController } from '../../presentation/post-like/post-like.controller';
import { PostLikeService } from './post-like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLike } from '../../domain/post-like/post-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostLike])],
  controllers: [PostLikeController],
  providers: [PostLikeService],
})
export class PostLikeModule {}
