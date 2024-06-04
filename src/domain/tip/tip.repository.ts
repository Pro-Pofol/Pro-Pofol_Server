import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tip } from './tip.entity';
import {
  ReadTipPort,
  SaveTipPort,
  UpdateTipPort,
} from '../../core/tip/port/tip.out.port';
import {
  ModifyTipRequest,
  SearchTipRequest,
} from 'src/presentation/tip/dto/tip.request';

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

  searchTip = async (dto: SearchTipRequest): Promise<object[]> => {
    const { keyword, sort } = dto;

    return await this.tipEntity
      .createQueryBuilder('tip')
      .innerJoin('tip.user', 'user', 'user.id = tip.writer_id')
      .select([
        'tip.id AS id',
        'tip.title AS title',
        'tip.content AS content',
        'tip.created_at AS created_at',
        'user.name AS writer_name',
      ])
      .where('tip.title LIKE :title', { title: `%${keyword}%` })
      .orderBy('tip.created_at', `${sort}`)
      .groupBy('tip.id')
      .getRawMany();
  };
}
