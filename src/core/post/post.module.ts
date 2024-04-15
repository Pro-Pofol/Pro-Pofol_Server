import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from '../../presentation/post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../domain/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
