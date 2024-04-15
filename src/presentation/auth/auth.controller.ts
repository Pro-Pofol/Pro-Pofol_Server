import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Headers,
  Inject,
  Post,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import {
  GenerateKakaoTokenUseCase,
  SignupUseCase,
} from '../../core/auth/port/auth.in.port';
import { SignupRequest } from './dto/auth.request';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('auth')
    private readonly signupUseCase: SignupUseCase,
    @Inject('kakao')
    private readonly generateKakaoTokenUseCase: GenerateKakaoTokenUseCase,
  ) {}

  @Post('/google/signup') // API-Auth-002
  async googleSignup(
    @Headers('OA-TOKEN') token: string,
    @Body() req: SignupRequest,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) throw new BadRequestException('OA-TOKEN: null일 수 없습니다.');

    await this.signupUseCase.signupWithGoogle(token, req);

    return res.status(201).send();
  }

  @Post('/kakao/signup') // API-Auth-202
  async kakaoSignup(
    @Headers('OA-TOKEN') token: string,
    @Body() req: SignupRequest,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token) throw new BadRequestException('OA-TOKEN: null일 수 없습니다.');

    await this.signupUseCase.signupWithKakao(token, req);

    return res.status(201).send();
  }

  @Get('/kakao/token') // API-Auth-203
  async kakaoToken(
    @Query('code') code: string,
    @Res() res: Response,
  ): Promise<Response> {
    if (!code) throw new HttpException('code: null일 수 없습니다.', 400);

    return res
      .status(200)
      .json(await this.generateKakaoTokenUseCase.generateKakaoToken(code))
      .send();
  }
}
