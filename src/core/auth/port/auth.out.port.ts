import {
  GoogleProfileResponse,
  TokenResponse,
} from '../../../presentation/auth/dto/auth.response';
import { User } from '../../../domain/user/user.entity';

export interface GenerateTokensPort {
  generateTokens(sub: string): Promise<TokenResponse>;
}

export interface ReadCurrentUserPort {
  verifyUser(token: string): Promise<User>;
}

export interface ReadGoogleProfilePort {
  getGoogleProfile(token: string): Promise<GoogleProfileResponse>;
}

export interface ReissuePort {
  reissue(rfToken: string): Promise<TokenResponse>;
}
