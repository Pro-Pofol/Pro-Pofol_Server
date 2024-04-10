import { SignupRequest } from '../../../presentation/auth/auth.dto';

export interface SignupUseCase {
  signupWithGoogle(token: string, req: SignupRequest): Promise<void>;
}
