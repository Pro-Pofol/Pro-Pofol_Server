import { Major, PostType } from '../../../domain/post/post.entity';

export class PostResponse {
  id: number;
  title: string;
  type: PostType;
  writer_name: string;
  created_at: Date;
  major: Major;
}
