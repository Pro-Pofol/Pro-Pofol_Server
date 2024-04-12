import { KakaoTokenResponse, SignupRequest } from '../../../presentation/auth/auth.dto';

export interface SignupUseCase {
  signupWithGoogle(token: string, req: SignupRequest): Promise<void>;

  signupWithKakao(token: string, req: SignupRequest): Promise<void>;
}

export interface GenerateKakaoTokenUseCase {
  generateKakaoToken(code: string): Promise<KakaoTokenResponse>;
}
