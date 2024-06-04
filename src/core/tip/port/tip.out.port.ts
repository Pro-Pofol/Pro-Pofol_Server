import { ModifyTipRequest } from 'src/presentation/tip/dto/tip.request';
import { Tip } from '../../../domain/tip/tip.entity';

export interface SaveTipPort {
  save(tip: Tip): Promise<Tip>;
}

export interface UpdateTipPort {
  update(tipId: number, dto: ModifyTipRequest): Promise<void>;
}

export interface ReadTipPort {
  findByIdOrFail(tipId: number): Promise<Tip>;
}
