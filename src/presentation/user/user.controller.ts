import {
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { GetUserInfoUseCase } from '../../core/user/port/user.in.port';
import { Response } from 'express';

@Controller()
export class UserController {
  constructor(
    @Inject('getUser')
    private readonly getUserInfoUseCase: GetUserInfoUseCase,
  ) {}

  @Get('/users/me')
  async getMyInfo(
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) {
      throw new UnauthorizedException('No Authenticated');
    }

    return res
      .json(await this.getUserInfoUseCase.getMyInfo(token))
      .sendStatus(200);
  }

  @Get('/users/:id')
  async getUserInfo(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    return res
      .json(await this.getUserInfoUseCase.getUserInfo(id))
      .sendStatus(200);
  }
}
