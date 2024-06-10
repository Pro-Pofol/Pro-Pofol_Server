import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ModifyTipRequest,
  SearchTipRequest,
  WriteTipRequest,
} from './dto/tip.request';
import { Response } from 'express';
import {
  ModifyTipUseCase,
  ReadDetailTipUseCase,
  ReadRecommendedTipUseCase,
  SearchTipUseCase,
  WriteTipUseCase,
} from '../../core/tip/port/tip.in.port';
import { SortType } from 'src/domain/post/post.entity';

@Controller('tip')
export class TipController {
  constructor(
    @Inject('writeTip')
    private readonly writeTipUseCase: WriteTipUseCase,
    @Inject('modifyTip')
    private readonly modifyTipUseCase: ModifyTipUseCase,
    @Inject('readDetailTip')
    private readonly readDetailTipUseCase: ReadDetailTipUseCase,
    @Inject('searchTip')
    private readonly searchTipUseCase: SearchTipUseCase,
    @Inject('readRecommendedTip')
    private readonly readRecommendedTipUseCase: ReadRecommendedTipUseCase,
  ) {}

  @Get('/search')
  async searchTip(
    @Query() dto: SearchTipRequest,
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) {
      throw new UnauthorizedException('Permission denied');
    }

    return res
      .status(200)
      .json({ tips: await this.searchTipUseCase.searchTip(dto, token) })
      .send();
  }

  @Get('/recommend')
  async readRecommended(@Res() res: Response): Promise<Response> {
    return res
      .status(200)
      .json({
        posts: await this.readRecommendedTipUseCase.readRecommendedTip(),
      })
      .send();
  }

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
