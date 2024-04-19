import { User } from '../../../domain/user/user.entity';
import {
  FacebookInfoResponse,
  FacebookProfileImageResponse,
  GoogleProfileResponse,
  KakaoProfileResponse,
  TokenResponse,
} from '../../../presentation/auth/dto/auth.response';

export interface GenerateTokensPort {
  generateTokens(sub: string): Promise<TokenResponse>;
}

export interface ReadCurrentUserPort {
  verifyUser(token: string): Promise<User>;
}

export interface ReadGoogleProfilePort {
  getGoogleProfile(token: string): Promise<GoogleProfileResponse>;
}

export interface ReadKakaoProfilePort {
  getKakaoProfile(token: string): Promise<KakaoProfileResponse>;
}

export interface ReadFacebookProfilePort {
  getFacebookProfile(token: string): Promise<FacebookInfoResponse>;

  getFacebookProfileImage(token: string): Promise<FacebookProfileImageResponse>;
}

export interface ReissuePort {
  reissue(rfToken: string): Promise<TokenResponse>;
}
