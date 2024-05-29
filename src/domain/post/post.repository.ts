import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, PostType } from './post.entity';
import {
  ReadPostPort,
  RemovePostPort,
  SavePostPort,
} from '../../core/post/port/post.out.port';
import { PostSearchRequest } from 'src/presentation/post/dto/post.request';

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
      .select([
        'post.writer_id',
        'post.id',
        'post.post_type',
        'post.title',
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
      .select([
        'post.id',
        'post.title',
        'post.post_type',
        'post.writer_id',
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

  searchPost = async (dto: PostSearchRequest): Promise<object[]> => {
    const { keyword, type, major, sort } = dto;

    const posts = await this.postEntity
      .createQueryBuilder('post')
      .innerJoin('post.user', 'user', 'user.id = post.writer_id')
      .select([
        'post.id AS id',
        'post.post_type AS post_type',
        'post.title AS title',
        'post.major AS major',
        'post.created_at AS created_at',
        'user.name AS writer_name',
      ])
      .where('post.title LIKE :title', { title: `%${keyword}%` })
      .andWhere('post.major = :major', { major })
      .orderBy('post.created_at', `${sort}`)
      .groupBy('post.id');

    if (type !== PostType.EVERYTHING) {
      posts.andWhere('post.post_type = :post_type', { post_type: type });
    }

    return posts.getRawMany();
  };
}
