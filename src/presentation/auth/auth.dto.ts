import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Major } from '../../common/enums';

export class GoogleProfileResponse {
  sub: string;
  name: string;
  given_name: string;
  family_name: string | null;
  picture: string;
  email: string;
  email_verified: boolean;
}

export class KakaoProfileResponse {
  id: string;
  properties: {
    nickname: string;
    profile_image: string;
  };
}

export class KakaoTokenResponse {
  access_token: string;
}

export class TokenResponse {
  access_token: string;
  refresh_token: string;

  constructor(accessToken?: string, refreshToken?: string) {
    if (accessToken && refreshToken) {
      this.access_token = accessToken;
      this.refresh_token = refreshToken;
    }
  }
}

export class SignupRequest {
  @IsString({
    message: (validationArguments) =>
      `${validationArguments.property} : string이여야 합니다.`,
  })
  @IsOptional()
  name?: string;

  @IsNotEmpty({
    message: (validationArguments) =>
      `${validationArguments.property} : null일 수 없습니다.`,
  })
  @IsNotEmptyObject(
    { nullable: false },
    {
      message: (validationArguments) =>
        `${validationArguments.property} : null일 수 없습니다.`,
    },
  )
  @IsEnum(Major, {
    message: (validationArguments) =>
      `${validationArguments.property} : enum값이 아닙니다.`,
  })
  major: Major;

  @IsNotEmpty({
    message: (validationArguments) =>
      `${validationArguments.property} : null일 수 없습니다.`,
  })
  generation: number;

  @IsString({
    message: (validationArguments) =>
      `${validationArguments.property} : string 이여야 합니다.`,
  })
  @IsOptional()
  profile_image_url?: string;
}
