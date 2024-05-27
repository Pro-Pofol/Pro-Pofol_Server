import { GetUserInfoUseCase } from './port/user.in.port';
import { ReadUserPort } from './port/user.out.port';
import { Inject } from '@nestjs/common';
import { UserResponse } from '../../presentation/user/dto/user.response';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';

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
      user.major,
    );
  };

  getMyInfo = async (token: string): Promise<UserResponse> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    return new UserResponse(
      user.id,
      user.name,
      user.generation,
      user.profile_image,
      user.major,
    );
  };
}
