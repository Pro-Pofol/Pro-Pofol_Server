import { IsNotEmpty, IsString } from 'class-validator';
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
  @IsString({ message: 'string 이여야 합니다.' })
  name?: string | null;

  @IsNotEmpty({ message: 'null일 수 없습니다.' })
  major: Major;

  @IsNotEmpty({ message: 'null일 수 없습니다.' })
  generation: number;

  @IsNotEmpty({ message: 'null일 수 없습니다.' })
  @IsString({ message: 'string 이여야 합니다.' })
  profile_image_url?: string | null;
}
