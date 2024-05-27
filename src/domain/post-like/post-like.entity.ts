import { Post } from 'src/domain/post/post.entity';
import { User } from 'src/domain/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('tbl_post_like')
export class PostLike {
  @PrimaryColumn({ name: 'user_id', length: 21 })
  user_id: string;

  @PrimaryColumn({ name: 'post_id' })
  post_id: number;

  @ManyToOne(() => User, (user) => user.post_like, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.post_like, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
