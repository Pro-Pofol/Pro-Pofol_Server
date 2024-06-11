import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ModifyTipRequest,
  SearchTipRequest,
  WriteTipRequest,
} from './dto/tip.request';
import { Request, Response } from 'express';
import {
  DeleteTipUseCase,
  ModifyTipUseCase,
  ReadDetailTipUseCase,
  ReadRecommendedTipUseCase,
  SearchTipUseCase,
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
    @Inject('searchTip')
    private readonly searchTipUseCase: SearchTipUseCase,
    @Inject('readRecommendedTip')
    private readonly readRecommendedTipUseCase: ReadRecommendedTipUseCase,
    @Inject('deleteTip')
    private readonly deleteTipUseCase: DeleteTipUseCase,
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

  @Delete('/:tipId')
  async deleteTip(
    @Headers('Authorization') token: string,
    @Param('tipId') tipId: number,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token || !tipId) {
      throw new UnauthorizedException('Permission denied');
    }
    await this.deleteTipUseCase.deleteFromId(tipId, token);

    return res.sendStatus(200);
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
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) {
      throw new UnauthorizedException('Permission denied');
    }

    const tipId = await this.writeTipUseCase.write(dto, token);

    let location: string;

    if (req.hostname != 'localhost') {
      location = `${req.protocol}://${req.hostname}/tip/${tipId}`;
    } else {
      location = `${req.protocol}://${req.hostname}:${process.env.PORT}/tip/${tipId}`;
    }

    return res.location(location).sendStatus(201);
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
    if (!token || !tipId) {
      throw new UnauthorizedException('Permission denied');
    }

    return res
      .json(await this.readDetailTipUseCase.readDetail(tipId, token))
      .sendStatus(200);
  }
}
