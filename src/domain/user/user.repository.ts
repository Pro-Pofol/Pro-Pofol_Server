import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ReadUserPort, SaveUserPort } from '../../core/user/port/user.out.port';

@Injectable()
export class UserRepository implements ReadUserPort, SaveUserPort {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  readByOauthId = async (oauthId: string): Promise<User | null> => {
    return await this.userRepository.findOne({
      where: { oauthId: oauthId },
    });
  };

  readByOauthIdOrFail = async (oauthId: string): Promise<User> => {
    const user = await this.userRepository.findOne({ where: { oauthId: oauthId } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  };

  save = async (entity: User): Promise<User> => {
    return await this.userRepository.save(entity);
  };
}