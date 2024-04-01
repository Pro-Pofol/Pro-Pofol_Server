import { TipLike } from 'src/tip-like/entity/tip-like.entity';
import { User } from 'src/user/entity/user.entity';
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

  @Column()
  writerId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tip, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'writerId' })
  user: User;

  @OneToMany(() => TipLike, (tipLike) => tipLike.tip)
  tipLike: TipLike;
}
