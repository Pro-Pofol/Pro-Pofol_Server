import {
  Controller,
  Headers,
  Inject,
  Param,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { FollowUserUseCase } from '../../core/follow/port/follow.in.port';

@Controller()
export class FollowController {
  constructor(
    @Inject('followUser')
    private readonly followUserUseCase: FollowUserUseCase,
  ) {}

  @Post('/users/follow/:oauth-id')
  async follow(
    @Param('oauthId') oauth_id: string,
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) {
      throw new UnauthorizedException('Permission denied');
    }

    await this.followUserUseCase.follow(oauth_id, token);

    return res.sendStatus(201);
  }
}
