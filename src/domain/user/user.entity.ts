import { Follow } from 'src/domain/follow/follow.entity';
import { PostLike } from 'src/domain/post-like/post-like.entity';
import { Major, Post } from 'src/domain/post/post.entity';
import { TipLike } from 'src/domain/tip-like/tip-like.entity';
import { Tip } from 'src/domain/tip/tip.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Length } from 'class-validator';

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'uuid', type: 'binary', length: 36 })
  uuid: string;

  @Column({ name: 'oauth_id', unique: true })
  oauth_id: string;

  @Column()
  name: string;

  @Length(0, 8)
  @Column({ nullable: true, type: 'enum', enum: Major })
  major?: Major;

  @Index()
  @Column({ nullable: true })
  generation?: number;

  @Column({ name: 'profile_image', nullable: true, length: 305 })
  profile_image?: string;

  @OneToMany(() => Post, (post) => post.user)
  post?: Post[] | null;

  @OneToMany(() => PostLike, (postLike) => postLike.user)
  postLike?: PostLike[] | null;

  @OneToMany(() => Tip, (tip) => tip.user)
  tip?: Tip[] | null;

  @OneToMany(() => TipLike, (tipLike) => tipLike.user)
  tipLike?: TipLike[] | null;

  @OneToMany(() => Follow, (follow) => follow.follower)
  follower?: Follow[] | null;

  @OneToMany(() => Follow, (follow) => follow.target)
  target?: Follow[] | null;

  constructor(
    id: number | null,
    uuid: string | null,
    oauth_id: string,
    name: string,
    major: Major,
    generation: number,
    profile_image: string,
    post?: Post[] | null,
    postLike?: PostLike[] | null,
    tip?: Tip[] | null,
    tipLike?: TipLike[] | null,
    follower?: Follow[] | null,
    target?: Follow[] | null,
  ) {
    if (id) this.id = id;
    if (uuid) this.uuid = uuid;
    else this.uuid = v4();
    this.oauth_id = oauth_id;
    this.name = name;
    this.major = major;
    this.generation = generation;
    this.profile_image = profile_image;
    this.post = post;
    this.postLike = postLike;
    this.tip = tip;
    this.tipLike = tipLike;
    this.follower = follower;
    this.target = target;
  }
}
