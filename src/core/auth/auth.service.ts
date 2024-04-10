import { HttpException, Inject, Injectable } from '@nestjs/common';
import { SignupUseCase } from './port/auth.in.port';
import { SignupRequest } from '../../presentation/auth/auth.dto';
import { ReadGoogleProfilePort } from './port/auth.out.port';
import { User } from '../../domain/user/user.entity';
import { ReadUserPort, SaveUserPort } from '../user/port/user.out.port';

@Injectable()
export class AuthService implements SignupUseCase {
  constructor(
    @Inject('user out port')
    private readonly saveUserPort: SaveUserPort,
    @Inject('user out port')
    private readonly readUserPort: ReadUserPort,
    @Inject('google')
    private readonly readGoogleProfilePort: ReadGoogleProfilePort,
  ) {}

  signupWithGoogle = async (token: string, req: SignupRequest) => {
    const profile = await this.readGoogleProfilePort.getGoogleProfile(token);

    if (await this.readUserPort.readByOauthId(profile.sub)) {
      throw new HttpException('Already registered', 409);
    }

    const user = new User(
      null,
      null,
      profile.sub,
      req.name ?? profile.name,
      req.major,
      req.generation,
      req.profile_image_url ?? profile.picture,
      null,
      null,
      null,
      null,
      null,
      null,
    );

    await this.saveUserPort.save(user);
  };
}
