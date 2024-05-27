import { TipLike } from 'src/domain/tip-like/tip-like.entity';
import { User } from 'src/domain/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_tip')
export class Tip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'writer_id' })
  writer_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at'})
  created_at: Date;

  @ManyToOne(() => User, (user) => user.tip, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'writer_id' })
  user: User;

  @OneToMany(() => TipLike, (tipLike) => tipLike.tip)
  tipLike: TipLike;

  constructor(title: string, content: string, user: User, id?: number) {
    this.title = title;
    this.content = content;
    this.user = user;
    if (id) this.id = id;
  }
}
