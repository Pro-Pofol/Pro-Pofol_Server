import {
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { WriteTipRequest } from './dto/tip.request';
import { Response } from 'express';
import { WriteTipUseCase } from '../../core/tip/port/tip.in.port';

@Controller()
export class TipController {
  constructor(
    @Inject('tip in port')
    private writeTipUseCase: WriteTipUseCase,
  ) {}

  @Post('/tip')
  async writeTip(
    @Body() dto: WriteTipRequest,
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) {
      throw new UnauthorizedException('Permission denied');
    }

    await this.writeTipUseCase.write(dto, token);

    return res.sendStatus(201);
  }
}
