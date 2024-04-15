import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SignupUseCase } from '../../core/auth/port/auth.in.port';
import { SignupRequest } from './dto/auth.request';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('auth')
    private readonly signupUseCase: SignupUseCase,
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
}
