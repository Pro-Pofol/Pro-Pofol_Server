import { WriteTipRequest } from '../../../presentation/tip/dto/tip.request';

export interface WriteTipUseCase {
  write(dto: WriteTipRequest, token: string): Promise<void>;
}
