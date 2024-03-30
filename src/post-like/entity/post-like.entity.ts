import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
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
