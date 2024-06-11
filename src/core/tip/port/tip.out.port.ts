import {
  ModifyTipRequest,
  SearchTipRequest,
} from 'src/presentation/tip/dto/tip.request';
import { Tip } from '../../../domain/tip/tip.entity';

export interface SaveTipPort {
  save(tip: Tip): Promise<Tip>;
}

export interface UpdateTipPort {
  update(tipId: number, dto: ModifyTipRequest): Promise<void>;
}

export interface ReadTipPort {
  findByIdOrFail(id: number): Promise<Tip>;

  searchTip(dto: SearchTipRequest): Promise<object[]>;

  readAllTipByRandom(): Promise<object[] | null>;
}

export interface DeleteTipPort {
  deleteById(tipId: number): Promise<void>;
}
