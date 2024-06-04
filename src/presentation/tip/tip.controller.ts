import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Patch,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ModifyTipRequest, WriteTipRequest } from './dto/tip.request';
import { Response } from 'express';
import {
  ModifyTipUseCase,
  ReadDetailTipUseCase,
  WriteTipUseCase,
} from '../../core/tip/port/tip.in.port';

@Controller('tip')
export class TipController {
  constructor(
    @Inject('writeTip')
    private readonly writeTipUseCase: WriteTipUseCase,
    @Inject('modifyTip')
    private readonly modifyTipUseCase: ModifyTipUseCase,
    @Inject('readDetailTip')
    private readonly readDetailTipUseCase: ReadDetailTipUseCase,
  ) {}

  @Post()
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

  @Patch('/:tipId')
  async modifyTip(
    @Headers('Authorization') token: string,
    @Param('tipId') tipId: number,
    @Body() dto: ModifyTipRequest,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) {
      throw new UnauthorizedException('Permission denied');
    }

    await this.modifyTipUseCase.modify(dto, tipId, token);

    return res.sendStatus(200);
  }

  @Get('/:tipId')
  async readDetailTip(
    @Headers('Authorization') token: string,
    @Param('tipId') tipId: number,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) {
      throw new UnauthorizedException('Permission denied');
    }

    return res
      .json(await this.readDetailTipUseCase.readDetail(tipId, token))
      .sendStatus(200);
  }
}
