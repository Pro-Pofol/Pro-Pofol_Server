import { WriteTipUseCase } from './port/tip.in.port';
import { WriteTipRequest } from '../../presentation/tip/dto/tip.request';
import { Tip } from '../../domain/tip/tip.entity';
import { Inject } from '@nestjs/common';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import { SaveTipPort } from './port/tip.out.port';

export class WriteTipService implements WriteTipUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('tip out port')
    private readonly saveTipPort: SaveTipPort,
  ) {}

  write = async (dto: WriteTipRequest, token: string): Promise<void> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    const tip = new Tip(dto.title, dto.content, user);

    await this.saveTipPort.save(tip);
  };
}
