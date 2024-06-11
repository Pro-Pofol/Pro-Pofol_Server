import {
  DeleteTipUseCase,
  ModifyTipUseCase,
  ReadDetailTipUseCase,
  ReadRecommendedTipUseCase,
  SearchTipUseCase,
  WriteTipUseCase,
} from './port/tip.in.port';
import {
  ModifyTipRequest,
  SearchTipRequest,
  WriteTipRequest,
} from '../../presentation/tip/dto/tip.request';
import { Tip } from '../../domain/tip/tip.entity';
import {
  ForbiddenException,
  HttpException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import { DeleteTipPort, ReadTipPort, SaveTipPort, UpdateTipPort } from './port/tip.out.port';
import { JwtAdapter } from '../../infrastructure/jwt/jwt.adapter';

export class WriteTipService implements WriteTipUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('tip out port')
    private readonly saveTipPort: SaveTipPort,
  ) {}

  write = async (dto: WriteTipRequest, token: string): Promise<number> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    const tip = await this.saveTipPort.save(
      new Tip(dto.title, dto.content, user),
    );

    return tip.id;
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

export class SearchTipService implements SearchTipUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('tip out port')
    private readonly readTipPort: ReadTipPort,
  ) {}

  searchTip = async (
    dto: SearchTipRequest,
    token: string,
  ): Promise<object[]> => {
    await this.readCurrentUserPort.verifyUser(token);

    const data = await this.readTipPort.searchTip(dto);
    if (data.length === 0) throw new HttpException('There is No Content', 204);

    return data;
  };
}

export class ReadRecommendedTipService implements ReadRecommendedTipUseCase {
  constructor(
    @Inject('tip out port')
    private readonly readTipPort: ReadTipPort,
  ) {}

  readRecommendedTip = async (): Promise<object[]> => {
    const data = await this.readTipPort.readAllTipByRandom();

    if (!data || data.length === 0)
      throw new HttpException('There is No Content', 204);

    return data;
  };
}

export class DeleteTipService implements DeleteTipUseCase {
  constructor(
    @Inject('tip out port')
    private readonly readTipPort: ReadTipPort,
    @Inject('tip out port')
    private readonly deleteTipPort: DeleteTipPort,
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
  ) {}

  deleteFromId = async (tipId: number, token: string): Promise<void> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    console.log(tipId);

    const tip = await this.readTipPort.findByIdOrFail(tipId);
    console.log(tip);

    if (user.id != tip.writer_id) {
      throw new ForbiddenException('Permission denied for this tip');
    }

    console.log(tip.id);

    await this.deleteTipPort.deleteById(tip.id);
  };
}
