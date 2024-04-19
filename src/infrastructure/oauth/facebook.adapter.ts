import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { ReadFacebookProfilePort } from 'src/core/auth/port/auth.out.port';
import {
  FacebookInfoResponse,
  FacebookProfileImageResponse,
} from 'src/presentation/auth/dto/auth.response';

@Injectable()
export class FacebookAuthAdaptor implements ReadFacebookProfilePort {
  private readonly logger = new Logger(FacebookAuthAdaptor.name);

  getFacebookProfile = async (token: string): Promise<FacebookInfoResponse> => {
    const response = await axios
      .get<FacebookInfoResponse>('https://graph.facebook.com/v19.0/me', {
        params: { access_token: token },
      })
      .catch((e: AxiosError) => {
        this.logger.error(e.message);
        this.logger.error(e.response?.status ?? e.status);
        this.logger.error(e.response?.data);

        throw new UnauthorizedException(e.response?.data ?? 'Invalid Token');
      });
    return response.data;
  };

  getFacebookProfileImage = async (token: string) => {
    const response = await axios
      .get<FacebookProfileImageResponse>(
        'https://graph.facebook.com/v19.0/me/picture',
        {
          params: { access_token: token, redirect: 'false' },
        },
      )
      .catch((e: AxiosError) => {
        this.logger.error(e.message);
        this.logger.error(e.response?.status ?? e.status);
        this.logger.error(e.response?.data);

        throw new UnauthorizedException(e.response?.data ?? 'Invalid Token');
      });
    return response.data;
  };
}
