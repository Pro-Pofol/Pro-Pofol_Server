import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Patch,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  GetUserInfoUseCase,
  UpdateMyInfoUseCase,
} from 'src/core/user/port/user.in.port';
import { UpdateMyInfoRequest } from './dto/user.request';

@Controller('users')
export class UserController {
  constructor(
    @Inject('getUser')
    private readonly getUserInfoUseCase: GetUserInfoUseCase,
    @Inject('updateMyInfo')
    private readonly updateMyInfoUseCase: UpdateMyInfoUseCase,
  ) {}

  @Get('/me')
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

  @Get('/:id')
  async getUserInfo(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    return res
      .json(await this.getUserInfoUseCase.getUserInfo(id))
      .sendStatus(200);
  }

  @Patch('/me')
  async updateMyInfo(
    @Headers('Authorization') token: string,
    @Res() res: Response,
    @Body() dto: UpdateMyInfoRequest,
  ) {
    return res
      .status(200)
      .json(await this.updateMyInfoUseCase.updateMyInfo(token, dto))
      .send();
  }
}
