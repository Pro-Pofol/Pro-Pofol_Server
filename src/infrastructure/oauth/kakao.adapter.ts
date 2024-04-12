import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import {
  KakaoProfileResponse,
  KakaoTokenResponse,
} from '../../presentation/auth/auth.dto';
import { ReadKakaoProfilePort } from '../../core/auth/port/auth.out.port';
import { GenerateKakaoTokenUseCase } from '../../core/auth/port/auth.in.port';
import * as process from 'node:process';

@Injectable()
export class KakaoAuthAdapter
  implements ReadKakaoProfilePort, GenerateKakaoTokenUseCase
{
  private readonly logger = new Logger(KakaoAuthAdapter.name);

  getKakaoProfile = async (token: string): Promise<KakaoProfileResponse> => {
    const response = await axios
      .get<KakaoProfileResponse>('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: token },
        params: { property_keys: '["kakao_account.profile"]' },
      })
      .catch((e: AxiosError) => {
        this.logger.error(e.message);
        this.logger.error(e.response?.data);

        if (e.response?.status == 401) {
          throw new UnauthorizedException({
            status: 401,
            message: e.response?.data ?? 'Invalid Token',
          });
        } else if (e.response?.status == 403) {
          throw new UnauthorizedException({
            status: 403,
            message: e.response?.data ?? 'Invalid Credentials',
          });
        } else {
          this.logger.error(e.response?.status ?? e.status);
          throw new InternalServerErrorException(
            'Some thing went worn in OAuth',
          );
        }
      });

    return response.data;
  };

  generateKakaoToken = async (code: string): Promise<KakaoTokenResponse> => {
    const response = await axios
      .post<KakaoTokenResponse>('https://kauth.kakao.com/oauth/token', {
        params: {
          code: code,
          client_id: process.env.KAKAO_CLIENT_ID,
          grant_type: 'authorization_code',
          client_secret: process.env.KAKAO_SECRET_CLIENT_SECRET,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
        },
      })
      .catch((e: AxiosError) => {
        this.logger.error(e.message);
        this.logger.error(e.response?.data);

        if (e.response?.status == 401) {
          throw new UnauthorizedException({
            status: 401,
            message: e.response?.data ?? 'Invalid code',
          });
        } else if (e.response?.status == 403) {
          throw new UnauthorizedException({
            status: 403,
            message: e.response?.data ?? 'Invalid Credentials',
          });
        } else {
          this.logger.error(e.response?.status ?? e.status);
          throw new InternalServerErrorException(
            'Some thing went worn in OAuth',
          );
        }
      });

    return response.data;
  };
}
