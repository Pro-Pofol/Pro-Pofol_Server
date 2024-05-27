import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteFollowPort,
  ReadFollowPort,
  SaveFollowPort,
} from '../../core/follow/port/follow.out.port';
import { User } from '../user/user.entity';

@Injectable()
export class FollowRepository
  implements SaveFollowPort, DeleteFollowPort, ReadFollowPort
{
  constructor(
    @InjectRepository(Follow) private readonly entity: Repository<Follow>,
  ) {}

  save = async (entity: Follow): Promise<Follow> => {
    return this.entity.save(entity);
  };

  deleteById = async (id: number): Promise<void> => {
    await this.entity.delete(id);
  };

  readByUserAndTarget = async (
    user: User,
    target: User,
  ): Promise<Follow | null> => {
    return await this.entity.findOneBy({
      follower: user,
      target: target,
    });
  };
}
