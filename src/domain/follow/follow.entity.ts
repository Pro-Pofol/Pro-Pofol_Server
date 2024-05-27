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

  @Column({ name: 'follower_id' })
  follower_id: number;

  @Column({ name: 'target_id' })
  target_id: number;

  @ManyToOne(() => User, (user) => user.follower, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'follower_id', referencedColumnName: 'id' })
  follower: User;

  @ManyToOne(() => User, (user) => user.target, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'target_id', referencedColumnName: 'id' })
  target: User;

  constructor(follower: User, target: User) {
    this.follower = follower;
    this.target = target;
  }
}
