import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { GoogleProfileResponse } from '../../presentation/auth/dto/auth.response';
import {
  ReadGoogleProfilePort,
  RevokeGoogleTokenPort,
} from '../../core/auth/port/auth.out.port';

@Injectable()
export class GoogleAuthAdapter
  implements ReadGoogleProfilePort, RevokeGoogleTokenPort
{
  private readonly logger = new Logger(GoogleAuthAdapter.name);

  getGoogleProfile = async (token: string) => {
    const response = await axios
      .get<GoogleProfileResponse>(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { params: { alt: 'json', access_token: token } },
      )
      .catch((e: AxiosError) => {
        this.logger.error(e.message);
        this.logger.error(e.response?.data);

        if (e.response?.status == 401) {
          throw new UnauthorizedException(e.response?.data ?? 'Invalid Token');
        } else {
          this.logger.error(e.response?.status ?? e.status);
          throw new InternalServerErrorException(
            'Some thing went worn in OAuth',
          );
        }
      });

    return response.data;
  };

  revokeGoogleToken = async (token: string): Promise<void> => {
    await axios
      .post(
        'https://oauth2.googleapis.com/revoke',
        {},
        { params: { token: token } },
      )
      .catch((e: AxiosError) => {
        this.logger.error(e.message);
        this.logger.error(e.response?.data);
      });
  };
}
