import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  Req,
  Query,
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
  SearchPostUseCase,
} from '../../core/post/port/post.in.port';
import { Request, Response } from 'express';
import {
  PostFileRequest,
  PostLinkRequest,
  PostSearchRequest,
} from './dto/post.request';
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
    @Inject('searchPost')
    private readonly searchPostUseCase: SearchPostUseCase,
  ) {}

  @Post('/link')
  async postLink(
    @Req() req: Request,
    @Body() dto: PostLinkRequest,
    @Res() res: Response,
    @Headers('Authorization') token: string,
  ): Promise<Response> {
    const id = await this.postLinkUseCase.postLink(dto, token);
    let location: string;

    if (req.hostname != 'localhost') {
      location = `${req.protocol}://${req.hostname}/post/read/${id}`;
    } else {
      location = `${req.protocol}://${req.hostname}:${process.env.PORT}/post/read/${id}`;
    }

    return res.status(201).location(location).send();
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async postFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: PostFileRequest,
    @Res() res: Response,
    @Headers('Authorization') token: string,
  ): Promise<Response> {
    if (!file || file.size <= 0) {
      throw new BadRequestException('File is empty');
    }

    const id = await this.postFileUseCase.postFile(dto, token, file);

    let location: string;

    if (req.hostname != 'localhost') {
      location = `${req.protocol}://${req.hostname}/post/read/${id}`;
    } else {
      location = `${req.protocol}://${req.hostname}:${process.env.PORT}/post/read/${id}`;
    }

    return res.status(201).location(location).send();
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

  @Get('search?')
  async searchPost(
    @Query() dto: PostSearchRequest,
    @Res() res: Response,
    @Headers('Authorization') token: string,
  ) {
    return res
      .status(200)
      .json({ posts: await this.searchPostUseCase.searchPost(dto, token) })
      .send();
  }
}
