import { SignupRequest } from '../../../presentation/auth/dto/auth.request';

export interface SignupUseCase {
  signupWithGoogle(token: string, req: SignupRequest): Promise<void>;
}
