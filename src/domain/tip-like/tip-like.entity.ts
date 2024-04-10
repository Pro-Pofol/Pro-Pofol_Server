import { Tip } from 'src/domain/tip/tip.entity';
import { User } from 'src/domain/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('tbl_tip_like')
export class TipLike {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  tipId: number;

  @ManyToOne(() => User, (user) => user.tipLike, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Tip, (tip) => tip.tipLike, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'tipId' })
  tip: Tip;
}
