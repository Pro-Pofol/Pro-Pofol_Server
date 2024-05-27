import { Tip } from '../../../domain/tip/tip.entity';

export interface SaveTipPort {
  save(tip: Tip): Promise<Tip>;
}
