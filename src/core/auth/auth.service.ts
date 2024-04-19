import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { LoginUseCase, SignupUseCase } from './port/auth.in.port';
import { SignupRequest } from '../../presentation/auth/dto/auth.request';
import {
  GenerateTokensPort,
  ReadFacebookProfilePort,
  ReadGoogleProfilePort,
  ReadKakaoProfilePort,
} from './port/auth.out.port';
import { User } from '../../domain/user/user.entity';
import { ExistsUserPort, SaveUserPort } from '../user/port/user.out.port';
import { TokenResponse } from 'src/presentation/auth/dto/auth.response';

@Injectable()
export class SignupService implements SignupUseCase {
  constructor(
    @Inject('user out port')
    private readonly saveUserPort: SaveUserPort,
    @Inject('user out port')
    private readonly existsUserPort: ExistsUserPort,
    @Inject('google')
    private readonly readGoogleProfilePort: ReadGoogleProfilePort,
    @Inject('kakao')
    private readonly readKakaoProfilePort: ReadKakaoProfilePort,
    @Inject('facebook')
    private readonly readFacebookProfilePort: ReadFacebookProfilePort,
  ) {}

  signupWithGoogle = async (token: string, req: SignupRequest) => {
    const profile = await this.readGoogleProfilePort.getGoogleProfile(token);

    if (await this.existsUserPort.existsByOauthId(profile.sub)) {
      throw new ConflictException('Already registered');
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

  signupWithKakao = async (
    token: string,
    req: SignupRequest,
  ): Promise<void> => {
    const profile = await this.readKakaoProfilePort.getKakaoProfile(token);

    if (await this.existsUserPort.existsByOauthId(profile.id)) {
      throw new ConflictException('Already registered');
    }

    const user = new User(
      null,
      null,
      profile.id,
      req.name ?? profile.properties.nickname,
      req.major,
      req.generation,
      req.profile_image_url ?? profile.properties.profile_image,
      null,
      null,
      null,
      null,
      null,
      null,
    );

    await this.saveUserPort.save(user);
  };

  signupWithFacebook = async (token: string, req: SignupRequest) => {
    const profile = await this.readFacebookProfilePort.getFacebookProfile(
      token,
    );

    if (await this.existsUserPort.existsByOauthId(profile.id)) {
      throw new ConflictException('Already registered');
    }

    const user = new User(
      null,
      null,
      profile.id,
      req.name ?? profile.name,
      req.major,
      req.generation,
      req.profile_image_url ??
        (await this.readFacebookProfilePort.getFacebookProfileImage(token)).data
          .url,
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

@Injectable()
export class LoginService implements LoginUseCase {
  constructor(
    @Inject('jwt')
    private readonly generateTokensPort: GenerateTokensPort,
    @Inject('user out port')
    private readonly existsUserPort: ExistsUserPort,
    @Inject('facebook')
    private readonly readFacebookProfilePort: ReadFacebookProfilePort,
    @Inject('kakao')
    private readonly readKakaoProfilePort: ReadKakaoProfilePort,
  ) {}

  loginWithFacebook = async (token: string): Promise<TokenResponse> => {
    const profile = await this.readFacebookProfilePort.getFacebookProfile(
      token,
    );

    if (!(await this.existsUserPort.existsByOauthId(profile.id))) {
      throw new ConflictException('User does not sign up');
    }

    return await this.generateTokensPort.generateTokens(profile.id);
  };

  loginWithKakao = async (token: string): Promise<TokenResponse> => {
    const profile = await this.readKakaoProfilePort.getKakaoProfile(token);

    if (!(await this.existsUserPort.existsByOauthId(profile.id))) {
      throw new ConflictException('User does not sign up');
    }

    return await this.generateTokensPort.generateTokens(profile.id);
  };
}
