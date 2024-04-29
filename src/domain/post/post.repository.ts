import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ReadPostPort, SavePostPort } from '../../core/post/port/post.out.port';

@Injectable()
export class PostRepository implements SavePostPort, ReadPostPort {
  constructor(
    @InjectRepository(Post) private readonly postEntity: Repository<Post>,
  ) {}

  save = async (post: Post): Promise<Post> => {
    return this.postEntity.save(post);
  };

  readByIdOrFail = async (id: number): Promise<Post> => {
    const post = await this.postEntity.findOneBy({ id });

    if (!post) throw new NotFoundException('User not found');

    return post;
  };
}
