import { GetUserInfoUseCase, UpdateMyInfoUseCase } from './port/user.in.port';
import { ReadUserPort, UpdateUserPort } from './port/user.out.port';
import { Inject } from '@nestjs/common';
import { UserResponse } from '../../presentation/user/dto/user.response';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import { UpdateMyInfoRequest } from 'src/presentation/user/dto/user.request';

export class GetUserInfoService implements GetUserInfoUseCase {
  constructor(
    @Inject('user out port')
    private readonly readUserPort: ReadUserPort,
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
}

export class UpdateMyInfoService implements UpdateMyInfoUseCase {
  constructor(
    @Inject('user out port')
    private readonly updateUserPort: UpdateUserPort,
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
  ) {}

  updateMyInfo = async (
    token: string,
    dto: UpdateMyInfoRequest,
  ): Promise<void> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    return await this.updateUserPort.update(user.id, dto);
  };
}
