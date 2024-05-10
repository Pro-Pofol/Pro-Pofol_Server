import {
  Body,
  Controller,
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
} from '../../core/post/port/post.in.port';
import { Response, Express } from 'express';
import { PostLinkRequest } from './dto/post.request';
import { Major, PostType } from '../../domain/post/post.entity';
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

  // @Post('/file/{title}/{type}/{major}')
  // @UseInterceptors(FileInterceptor('file'))
  // async postFile(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('post') title: string,
  //   @Param('type') type: PostType,
  //   @Param('major') major: Major,
  //   @Res() res: Response,
  //   @Headers('Authorization') token: string,
  // ): Promise<Response> {
  //   await this.postFileUseCase.postFile(title, type, major, token);
  //
  //   return res.status(201).send();
  // }
}
