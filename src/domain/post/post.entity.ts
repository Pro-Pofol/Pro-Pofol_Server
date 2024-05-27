import { PostLike } from 'src/domain/post-like/post-like.entity';
import { User } from 'src/domain/user/user.entity';
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

export enum Major {
  BACKEND = 'Backend',
  FRONTEND = 'Frontend',
  ANDROID = 'Android',
  IOS = 'iOS',
  GAME = 'Game',
  AI = 'AI',
  DESIGN = 'Design',
  BLOCKCHAIN = 'Blockchain',
  CROSS_PLATFORM = 'CrossPlatform',
}

export enum PostType {
  PORTFOLIO = 'Portfolio',
  PERSONAL_STATEMENT = 'PersonalStatement',
  RESUME = 'Resume',
}

@Entity('tbl_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'writer_id', length: 21 })
  writer_id: string;

  @Index()
  @Column({ name: 'post_type', type: 'enum', enum: PostType, nullable: false })
  post_type: PostType;

  @Column({ name: 'title', length: 55, nullable: false })
  title: string;

  @Column({ name: 'link', length: 120, nullable: true })
  link?: string;

  @Column({ type: 'enum', enum: Major })
  major?: Major;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.post, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'writer_id' })
  user: User;

  @OneToMany(() => PostLike, (post_like) => post_like.post)
  post_like: PostLike;

  constructor(
    id: number | null,
    writer_id: string,
    post_type: PostType,
    title: string,
    link: string | null,
    major: Major,
    created_at: Date | null,
    user: User | null,
    post_like: PostLike | null,
  ) {
    if (id) this.id = id;
    this.writer_id = writer_id;
    this.post_type = post_type;
    this.title = title;
    if (link) this.link = link;
    this.major = major;
    if (created_at) this.created_at = created_at;
    if (user) this.user = user;
    if (post_like) this.post_like = post_like;
  }
}
