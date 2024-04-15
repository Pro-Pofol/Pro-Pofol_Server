import { Major } from 'src/common/enums';
import { Follow } from 'src/domain/follow/follow.entity';
import { PostLike } from 'src/domain/post-like/post-like.entity';
import { Post } from 'src/domain/post/post.entity';
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

@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'uuid', type: 'binary', length: 36 })
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
    oauthId: string,
    name: string,
    major: Major,
    generation: number,
    profileImage: string,
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
    this.oauthId = oauthId;
    this.name = name;
    this.major = major;
    this.generation = generation;
    this.profileImage = profileImage;
    this.post = post;
    this.postLike = postLike;
    this.tip = tip;
    this.tipLike = tipLike;
    this.follower = follower;
    this.target = target;
  }
}
