import { GetUserInfoUseCase } from './port/user.in.port';
import { ReadUserPort } from './port/user.out.port';
import { Inject } from '@nestjs/common';
import { UserResponse } from '../../presentation/user/dto/user.response';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import { Follow } from '../../domain/follow/follow.entity';

export class GetUserInfoService implements GetUserInfoUseCase {
  constructor(
    @Inject('user out port')
    private readonly readUserPort: ReadUserPort,
  ) {}

  getUserInfo = async (oauth_id: string): Promise<UserResponse> => {
    const user = await this.readUserPort.findByOauthIdOrFail(oauth_id);

    return new UserResponse(
      user.oauthId,
      user.name,
      user.generation,
      user.profileImage,
      user.major,
    );
  };
}
