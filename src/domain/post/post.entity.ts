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

  @Column()
  writerId: number;

  @Index()
  @Column({ type: 'enum', enum: PostType, nullable: false })
  postType: PostType;

  @Column({ name: 'title', length: 55, nullable: false })
  title: string;

  @Column({ nullable: true })
  content?: string;

  @Column({ name: 'link', length: 93, nullable: true })
  link?: string;

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

  constructor(
    id: number | null,
    writerId: number,
    postType: PostType,
    title: string,
    content: string | null,
    link: string | null,
    major: Major,
    createdAt: Date | null,
    user: User | null,
    postLike: PostLike | null,
  ) {
    if (id) this.id = id;
    this.writerId = writerId;
    this.postType = postType;
    this.title = title;
    if (content) this.content = content;
    if (link) this.link = link;
    this.major = major;
    if (createdAt) this.createdAt = createdAt;
    if (user) this.user = user;
    if (postLike) this.postLike = postLike;
  }
}
