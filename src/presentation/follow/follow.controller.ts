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

  @Post('/users/follow/:oauthId')
  async follow(
    @Headers('Authorization') token: string,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) {
      throw new UnauthorizedException('Permission denied');
    }

    await this.followUserUseCase.follow(id, token);

    return res.sendStatus(200);
  }
}
