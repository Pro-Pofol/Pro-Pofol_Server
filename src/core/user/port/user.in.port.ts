import { UserResponse } from '../../../presentation/user/dto/user.response';

export interface GetUserInfoUseCase {
  getUserInfo(oauth_id: string): Promise<UserResponse>;
}
