import { Tip } from 'src/domain/tip/tip.entity';
import { User } from 'src/domain/user/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('tbl_tip_like')
export class TipLike {
  @PrimaryColumn({ name: 'user_id', length: 21 })
  user_id: string;

  @PrimaryColumn({ name: 'tip_id' })
  tip_id: number;

  @ManyToOne(() => User, (user) => user.tipLike, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Tip, (tip) => tip.tipLike, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'tip_id' })
  tip: Tip;
}
