import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignupUseCase } from '../../core/auth/port/auth.in.port';
import { SignupRequest } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly signupUseCase: SignupUseCase) {}

  @Post('/signup')
  async signup(
    @Param('access_token') token: string,
    @Body() req: SignupRequest,
    @Res() res: Response,
  ): Promise<Response> {
    await this.signupUseCase.signupWithGoogle(token, req);

    return res.status(201).send();
  }
}
