import { Major, PostType } from 'src/common/enums';
import { PostLike } from 'src/post-like/entity/post-like.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  writerId: number;

  @Index()
  @Column({ type: 'enum', enum: PostType })
  postType: PostType;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  link: string;

  @Column({ type: 'enum', enum: Major })
  major?: Major;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.post, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'writerId' })
  user: User;

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  postLike: PostLike;
}
