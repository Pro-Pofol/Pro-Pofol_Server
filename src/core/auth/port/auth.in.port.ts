import { SignupRequest } from '../../../presentation/auth/dto/auth.request';
import { KakaoTokenResponse } from '../../../presentation/auth/auth.response';

export interface SignupUseCase {
  signupWithGoogle(token: string, req: SignupRequest): Promise<void>;

  signupWithKakao(token: string, req: SignupRequest): Promise<void>;
}

export interface GenerateKakaoTokenUseCase {
  generateKakaoToken(code: string): Promise<KakaoTokenResponse>;
}
