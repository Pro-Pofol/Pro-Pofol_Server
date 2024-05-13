import {
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  PostFileUseCase,
  PostLinkUseCase,
} from '../../core/post/port/post.in.port';
import { Response } from 'express';
import { PostFileRequest, PostLinkRequest } from './dto/post.request';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(
    @Inject('postLink')
    private readonly postLinkUseCase: PostLinkUseCase,
    @Inject('postFile')
    private readonly postFileUseCase: PostFileUseCase,
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

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async postFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: PostFileRequest,
    @Res() res: Response,
    @Headers('Authorization') token: string,
  ): Promise<Response> {
    return res
      .status(201)
      .location(await this.postFileUseCase.postFile(dto, token, file))
      .send();
  }
}
