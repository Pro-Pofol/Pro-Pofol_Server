import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { ReadFacebookProfilePort } from 'src/core/auth/port/auth.out.port';
import { FacebookInfoResponse } from 'src/presentation/auth/dto/auth.response';

@Injectable()
export class FacebookAuthAdaptor implements ReadFacebookProfilePort {
  private readonly logger = new Logger(FacebookAuthAdaptor.name);

  getFacebookProfile = async (token: string): Promise<FacebookInfoResponse> => {
    const response = await axios
      .get<FacebookInfoResponse>('https://graph.facebook.com/v13.0/me', {
        params: { access_token: token },
      })
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
}
