import { Post } from '../../../domain/post/post.entity';

export interface SavePostPort {
  save(post: Post): Promise<Post>;
}

export interface ReadPostPort {
  readByIdOrFail(id: number): Promise<Post>;
}
