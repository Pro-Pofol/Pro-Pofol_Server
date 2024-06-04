import {
  ModifyTipUseCase,
  ReadDetailTipUseCase,
  WriteTipUseCase,
} from './port/tip.in.port';
import {
  ModifyTipRequest,
  WriteTipRequest,
} from '../../presentation/tip/dto/tip.request';
import { Tip } from '../../domain/tip/tip.entity';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import { ReadTipPort, SaveTipPort, UpdateTipPort } from './port/tip.out.port';

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

export class ModifyTipService implements ModifyTipUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('tip out port')
    private readonly readTipPort: ReadTipPort,
    @Inject('tip out port')
    private readonly updateTipPort: UpdateTipPort,
  ) {}

  modify = async (
    dto: ModifyTipRequest,
    tipId: number,
    token: string,
  ): Promise<void> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    const tip = await this.readTipPort.findByIdOrFail(tipId);
    if (user.id !== tip.writer_id)
      throw new ForbiddenException('You are Not Tip Writer');

    return await this.updateTipPort.update(tipId, dto);
  };
}

export class ReadDetailTipService implements ReadDetailTipUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('tip out port')
    private readonly readTipPort: ReadTipPort,
  ) {}

  readDetail = async (tipId: number, token: string): Promise<object> => {
    await this.readCurrentUserPort.verifyUser(token);

    return await this.readTipPort.findByIdOrFail(tipId);
  };
}
