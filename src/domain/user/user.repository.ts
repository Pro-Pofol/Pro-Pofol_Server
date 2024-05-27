import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import {
  ExistsUserPort,
  ReadUserPort,
  SaveUserPort,
} from '../../core/user/port/user.out.port';

@Injectable()
export class UserRepository
  implements ReadUserPort, SaveUserPort, ExistsUserPort
{
  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
  ) {}

  existsByOauthId = async (oauth_id: string): Promise<boolean> => {
    return await this.userEntity.existsBy({ oauth_id });
  };

  findByOauthIdOrFail = async (oauth_id: string): Promise<User> => {
    const user = await this.userEntity.findOneBy({ oauth_id });

    if (!user) throw new NotFoundException('User not found By Oauth Id');

    return user;
  };

  save = async (entity: User): Promise<User> => {
    return await this.userEntity.save(entity);
  };
}
