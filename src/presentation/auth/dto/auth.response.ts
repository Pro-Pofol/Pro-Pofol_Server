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
