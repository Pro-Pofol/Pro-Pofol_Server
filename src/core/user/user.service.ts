import { UserInfoUseCase } from './port/user.in.port';
import { ReadUserPort, UpdateUserPort } from './port/user.out.port';
import { Inject } from '@nestjs/common';
import { UserResponse } from '../../presentation/user/dto/user.response';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import { UpdateMyInfoRequest } from 'src/presentation/user/dto/user.request';

export class UserInfoService implements UserInfoUseCase {
  constructor(
    @Inject('user out port')
    private readonly readUserPort: ReadUserPort,
    @Inject('user out port')
    private readonly updateUserPort: UpdateUserPort,
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
  ) {}

  getUserInfo = async (id: string): Promise<UserResponse> => {
    const user = await this.readUserPort.findByIdOrFail(id);

    return new UserResponse(
      user.id,
      user.name,
      user.generation,
      user.profile_image,
      user.user_major,
    );
  };

  getMyInfo = async (token: string): Promise<UserResponse> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    return new UserResponse(
      user.id,
      user.name,
      user.generation,
      user.profile_image,
      user.user_major,
    );
  };

  updateMyInfo = async (
    token: string,
    dto: UpdateMyInfoRequest,
  ): Promise<void> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    return await this.updateUserPort.update(user.id, dto)
  };
}
