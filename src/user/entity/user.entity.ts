import { Major } from 'src/common/enums';
import { Follow } from 'src/follow/entity/follow.entity';
import { PostLike } from 'src/post-like/entity/post-like.entity';
import { Post } from 'src/post/entity/post.entity';
import { TipLike } from 'src/tip-like/entity/tip-like.entity';
import { Tip } from 'src/tip/entity/tip.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  uuid: string;

  @Column({ unique: true })
  oauthId: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'enum', enum: Major })
  major?: Major;

  @Index()
  @Column({ nullable: true })
  generation?: number;

  @Column({ nullable: true })
  profileImage?: string;

  @OneToMany(() => Post, (post) => post.user)
  post: Post;

  @OneToMany(() => PostLike, (postLike) => postLike.user)
  postLike: PostLike;

  @OneToMany(() => Tip, (tip) => tip.user)
  tip: Tip;

  @OneToMany(() => TipLike, (tipLike) => tipLike.user)
  tipLike: TipLike;

  @OneToMany(() => Follow, (follow) => follow.follower)
  follower: Follow;

  @OneToMany(() => Follow, (follow) => follow.target)
  target: Follow;
}
