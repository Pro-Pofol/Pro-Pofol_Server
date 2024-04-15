import { Post } from 'src/domain/post/post.entity';
import { User } from 'src/domain/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('tbl_post_like')
export class PostLike {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => User, (user) => user.postLike, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Post, (post) => post.postLike, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'postId' })
  post: Post;
}
