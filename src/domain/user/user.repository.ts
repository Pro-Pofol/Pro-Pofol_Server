import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import {
  ExistsUserPort,
  ReadUserPort,
  SaveUserPort,
  UpdateUserPort,
} from '../../core/user/port/user.out.port';
import { UpdateMyInfoRequest } from 'src/presentation/user/dto/user.request';

@Injectable()
export class UserRepository
  implements ReadUserPort, SaveUserPort, ExistsUserPort, UpdateUserPort
{
  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
  ) {}

  existsById = async (id: string): Promise<boolean> => {
    return await this.userEntity.existsBy({ id });
  };

  findByIdOrFail = async (id: string): Promise<User> => {
    const user = await this.userEntity.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found By Oauth Id');

    return user;
  };

  save = async (entity: User): Promise<User> => {
    return await this.userEntity.save(entity);
  };

  update = async (id: string, dto: UpdateMyInfoRequest): Promise<void> => {
    await this.userEntity.update(id, dto);
  }
}
