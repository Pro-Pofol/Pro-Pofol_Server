import { SignupRequest } from '../../../presentation/auth/dto/auth.request';
import {
  KakaoTokenResponse,
  TokenResponse,
} from '../../../presentation/auth/dto/auth.response';

export interface SignupUseCase {
  signupWithGoogle(token: string, req: SignupRequest): Promise<void>;

  signupWithKakao(token: string, req: SignupRequest): Promise<void>;

  signupWithFacebook(token: string, req: SignupRequest): Promise<void>;
}

export interface GenerateKakaoTokenUseCase {
  generateKakaoToken(code: string): Promise<KakaoTokenResponse>;
}

export interface LoginUseCase {
  loginWithFacebook(token: string): Promise<TokenResponse>;

  loginWithKakao(token: string): Promise<TokenResponse>;

  loginWithGoogle(token: string): Promise<TokenResponse>;
}
