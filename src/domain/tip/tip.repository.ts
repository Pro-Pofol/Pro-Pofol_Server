import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tip } from './tip.entity';
import {
  ReadTipPort,
  SaveTipPort,
  UpdateTipPort,
} from '../../core/tip/port/tip.out.port';
import { ModifyTipRequest } from 'src/presentation/tip/dto/tip.request';

@Injectable()
export class TipRepository implements SaveTipPort, UpdateTipPort, ReadTipPort {
  constructor(
    @InjectRepository(Tip) private readonly tipEntity: Repository<Tip>,
  ) {}

  save = async (entity: Tip): Promise<Tip> => {
    return await this.tipEntity.save(entity);
  };

  update = async (tipId: number, dto: ModifyTipRequest): Promise<void> => {
    await this.tipEntity.update(tipId, dto);
  };

  findByIdOrFail = async (tipId: number): Promise<Tip> => {
    const tip = await this.tipEntity.findOneBy({ id: tipId });

    if (!tip) throw new NotFoundException('Tip Not Found');

    return tip;
  };
}
