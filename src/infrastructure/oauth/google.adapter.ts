import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { GoogleProfileResponse } from '../../presentation/auth/auth.dto';
import { ReadGoogleProfilePort } from '../../core/auth/port/auth.out.port';

@Injectable()
export class GoogleAuthAdapter implements ReadGoogleProfilePort {
  private readonly logger = new Logger(GoogleAuthAdapter.name);

  getGoogleProfile = async (token: string) => {
    const response = await axios.get<GoogleProfileResponse>(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { params: { alt: 'json', access_token: token } },
    );

    if (response.status != 200) {
      this.logger.error(response.data);

      if (response.status === 400) {
        throw new UnauthorizedException('Invalid token');
      } else if (response.status == 401) {
        throw new UnauthorizedException('The token has expired');
      } else {
        throw new InternalServerErrorException('Some thing went worn in OAuth');
      }
    }

    return response.data;
  };
}
