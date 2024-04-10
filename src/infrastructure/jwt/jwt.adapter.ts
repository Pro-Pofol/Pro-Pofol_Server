import { HttpException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from '../../presentation/auth/auth.dto';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import {
  GenerateTokensPort,
  ReadCurrentUserPort,
  ReissuePort,
} from '../../core/auth/port/auth.out.port';
import { ReadUserPort } from '../../core/user/port/user.out.port';

@Injectable()
export class JwtAdapter
  implements GenerateTokensPort, ReadCurrentUserPort, ReissuePort
{
  constructor(
    @Inject('user out port')
    private readonly readUserPort: ReadUserPort,
    private readonly jwtService: JwtService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  generateTokens = async (sub: string) => {
    const accessToken = await this.generateAccessToken(sub);
    const refreshToken = await this.generateRefreshToken();

    await this.redis.set(
      sub,
      accessToken,
      'EX',
      Number(process.env.AC_TOKEN_EXP),
    );

    await this.redis.set(
      accessToken,
      refreshToken,
      'EX',
      Number(process.env.AC_TOKEN_EXP),
    );

    await this.redis.set(
      refreshToken,
      accessToken,
      'EX',
      Number(process.env.RF_TOKEN_EXP),
    );

    return new TokenResponse(accessToken, refreshToken);
  };

  verifyUser = async (token: string) => {
    try {
      if (token.startsWith('Bearer ')) token = token.substring(7);

      const sub: string = (
        await this.jwtService.verifyAsync(token, {
          secret: process.env.SECRET_KEY,
        })
      ).sub;

      return await this.readUserPort.readByOauthIdOrFail(sub);
    } catch (e) {
      console.error(e);
      throw new HttpException('Invalid token', 401, e.message);
    }
  };

  reissue = async (rfToken: string) => {
    const acToken = await this.redis.get(rfToken);

    if (!acToken) {
      throw new HttpException('Invalid refresh token', 400);
    }

    const sub = (
      await this.jwtService.verifyAsync(acToken, {
        secret: process.env.SECRET_KEY,
        ignoreExpiration: true,
      })
    ).sub;

    if (await this.redis.get(acToken)) {
      this.redis.del(acToken);
      this.redis.del(sub);
    }
    this.redis.del(rfToken);

    return await this.generateTokens(sub);
  };

  private async generateAccessToken(sub: string) {
    return await this.jwtService.signAsync(
      { sub: sub },
      {
        secret: process.env.SECRET_KEY,
        algorithm: 'HS256',
        expiresIn: '2h',
      },
    );
  }

  private async generateRefreshToken() {
    return await this.jwtService.signAsync(
      {},
      {
        secret: process.env.SECRET_KEY,
        algorithm: 'HS256',
        expiresIn: '7d',
      },
    );
  }
}
