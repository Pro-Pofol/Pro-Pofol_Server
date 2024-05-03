import { Module } from '@nestjs/common';
import { PostController } from '../../presentation/post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../domain/post/post.entity';
import { PostLinkService } from './post.service';
import { PostRepository } from '../../domain/post/post.repository';
import { JwtAdapter } from '../../infrastructure/jwt/jwt.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    { provide: 'postLink', useClass: PostLinkService },
    { provide: 'post out port', useClass: PostRepository },
    { provide: 'jwt', useClass: JwtAdapter },
  ],
  controllers: [PostController],
})
export class PostModule {}
