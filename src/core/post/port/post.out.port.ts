import { PostSearchRequest } from 'src/presentation/post/dto/post.request';
import { Post } from '../../../domain/post/post.entity';

export interface SavePostPort {
  save(post: Post): Promise<Post>;
}

export interface ReadPostPort {
  readByIdOrFail(id: number): Promise<Post>;

  readDetailPost(postId: number): Promise<object | null | undefined>;

  readAllByRandom(): Promise<object[]>;

  searchPost(dto: PostSearchRequest): Promise<object[]>;
}

export interface RemovePostPort {
  delete(postId: number): Promise<void>;
}
