import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { GetUserInfoUseCase } from '../../core/user/port/user.in.port';
import { Response } from 'express';

@Controller()
export class UserController {
  constructor(
    @Inject('getUser')
    private readonly getUserInfoUseCase: GetUserInfoUseCase,
  ) {}

  @Get('/users/:oauthId')
  async getUserInfo(
    @Param('oauthId') oauth_id: string,
    @Res() res: Response,
  ): Promise<Response> {
    return res
      .json(await this.getUserInfoUseCase.getUserInfo(oauth_id))
      .sendStatus(200);
  }
}
