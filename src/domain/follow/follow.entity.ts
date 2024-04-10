import { User } from 'src/domain/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_follow')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followerId: number;

  @Column()
  targetId: number;

  @ManyToOne(() => User, (user) => user.follower, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'followerId', referencedColumnName: 'id' })
  follower: User;

  @ManyToOne(() => User, (user) => user.target, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'targetId', referencedColumnName: 'id' })
  target: User;
}
