import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import {
  ReadPostPort,
  RemovePostPort,
  SavePostPort,
} from '../../core/post/port/post.out.port';

@Injectable()
export class PostRepository
  implements SavePostPort, ReadPostPort, RemovePostPort
{
  constructor(
    @InjectRepository(Post) private readonly postEntity: Repository<Post>,
  ) {}

  save = async (post: Post): Promise<Post> => {
    return this.postEntity.save(post);
  };

  readByIdOrFail = async (id: number): Promise<Post> => {
    const post = await this.postEntity.findOneBy({ id });

    if (!post) throw new NotFoundException('Post not found');

    return post;
  };

  readDetailPost = async (
    postId: number,
  ): Promise<object | null | undefined> => {
    return await this.postEntity
      .createQueryBuilder('post')
      .innerJoin('post.user', 'user', 'user.id = post.writer_id')
      .select([
        'user.oauthId',
        'post.id',
        'post.post_type',
        'post.title',
        'post.content',
        'post.link',
        'post.major',
        'post.created_at',
      ])
      .where('post.id = :id', { id: postId })
      .getRawOne();
  };

  readAllByRandom = async (): Promise<object[]> => {
    return await this.postEntity
      .createQueryBuilder('post')
      .innerJoin('post.user', 'user', 'user.id = post.writer_id')
      .select([
        'post.id',
        'post.title',
        'post.post_type',
        'user.name',
        'post.created_at',
        'post.major',
      ])
      .orderBy('RAND()')
      .limit(18)
      .getRawMany();
  };

  delete = async (postId: number): Promise<void> => {
    await this.postEntity.delete(postId);
  };
}
