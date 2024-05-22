import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tip } from './tip.entity';
import { SaveTipPort } from '../../core/tip/port/tip.out.port';

@Injectable()
export class TipRepository implements SaveTipPort {
  constructor(
    @InjectRepository(Tip) private readonly userEntity: Repository<Tip>,
  ) {}

  save = async (entity: Tip): Promise<Tip> => {
    return await this.userEntity.save(entity);
  };
}
