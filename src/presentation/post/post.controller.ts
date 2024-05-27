import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  PostFileUseCase,
  PostLinkUseCase,
  ReadDetailPostUseCase,
  ReadRecommendedUseCase,
  RemovePostUseCase,
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
    @Inject('readDetailPost')
    private readonly readDetailPostUseCase: ReadDetailPostUseCase,
    @Inject('removePost')
    private readonly removePostUseCase: RemovePostUseCase,
    @Inject('readRecommendedPost')
    private readonly readRecommendedUseCase: ReadRecommendedUseCase,
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

  @Get('/read/:postId')
  async readDetailPost(
    @Param('postId') postId: number,
    @Res() res: Response,
    @Headers('Authorization') token: string,
  ): Promise<Response> {
    return res
      .status(200)
      .json(await this.readDetailPostUseCase.readDetailPost(postId, token))
      .send();
  }

  @Delete('/:postId')
  async removePost(
    @Param('postId') postId: number,
    @Res() res: Response,
    @Headers('Authorization') token: string,
  ): Promise<Response> {
    await this.removePostUseCase.removePost(postId, token);

    return res.status(204).send();
  }

  @Get('/recommend')
  async readRecommended(@Res() res: Response): Promise<Response> {
    return res
      .status(200)
      .json({ posts: await this.readRecommendedUseCase.readRecommendedPost() })
      .send();
  }
}
