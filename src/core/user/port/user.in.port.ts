import { UpdateMyInfoRequest } from 'src/presentation/user/dto/user.request';
import { UserResponse } from '../../../presentation/user/dto/user.response';

export interface GetUserInfoUseCase {
  getUserInfo(oauth_id: string): Promise<UserResponse>;

  getMyInfo(token: string): Promise<UserResponse>;
}

export interface UpdateMyInfoUseCase {
  updateMyInfo(token: string, dto: UpdateMyInfoRequest): Promise<void>;
}