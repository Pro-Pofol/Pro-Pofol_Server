import {
  ModifyTipRequest,
  SearchTipRequest,
  WriteTipRequest,
} from '../../../presentation/tip/dto/tip.request';

export interface WriteTipUseCase {
  write(dto: WriteTipRequest, token: string): Promise<void>;
}

export interface ModifyTipUseCase {
  modify(dto: ModifyTipRequest, tipId: number, token: string): Promise<void>;
}

export interface ReadDetailTipUseCase {
  readDetail(tipId: number, token: string): Promise<object>;
}

export interface SearchTipUseCase {
  searchTip(dto: SearchTipRequest,token: string): Promise<object[]>
}