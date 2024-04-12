import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SignupUseCase } from '../../core/auth/port/auth.in.port';
import { SignupRequest } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('auth')
    private readonly signupUseCase: SignupUseCase,
  ) {}

  @Post('/google/signup') // API-Auth-002
  async googleSignup(
    @Query('access_token') token: string,
    @Body() req: SignupRequest,
    @Res() res: Response,
  ): Promise<Response> {
    if (!token)
      throw new HttpException('access_token: null일 수 없습니다.', 400);

    await this.signupUseCase.signupWithGoogle(token, req);

    return res.status(201).send();
  }
}
