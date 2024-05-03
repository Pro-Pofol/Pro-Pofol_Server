import { Body, Controller, Headers, Inject, Post, Res } from '@nestjs/common';
import { PostLinkUseCase } from '../../core/post/port/post.in.port';
import { Response } from 'express';
import { PostLinkRequest } from './dto/post.request';

@Controller('post')
export class PostController {
  constructor(
    @Inject('postLink')
    private readonly postLinkUseCase: PostLinkUseCase,
  ) {}

  @Post('/link')
  async postLink(
    @Body() req: PostLinkRequest,
    @Res() res: Response,
    @Headers('Authorization') token: string,
  ): Promise<Response> {
    await this.postLinkUseCase.postLink(req, token);

    return res.status(201).send();
  }
}
