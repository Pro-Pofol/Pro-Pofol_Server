import {
  PostFileUseCase,
  PostLinkUseCase,
  ReadDetailPostUseCase,
  ReadRecommendedUseCase,
  RemovePostUseCase,
  SearchPostUseCase,
} from './port/post.in.port';
import {
  PostFileRequest,
  PostLinkRequest,
  PostSearchRequest,
} from '../../presentation/post/dto/post.request';
import { Post } from '../../domain/post/post.entity';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import {
  ReadPostPort,
  RemovePostPort,
  SavePostPort,
} from './port/post.out.port';
import { ForbiddenException, HttpException, Inject } from '@nestjs/common';
import { AwsService } from '../../infrastructure/aws/aws.service';
import { v4 } from 'uuid';

export class PostLinkService implements PostLinkUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('post out port')
    private readonly savePostPort: SavePostPort,
  ) {}

  postLink = async (req: PostLinkRequest, token: string): Promise<number> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    const post = new Post(
      null,
      user.id,
      req.type,
      req.title,
      req.link,
      req.major,
      null,
      user,
      null,
    );

    return (await this.savePostPort.save(post)).id;
  };
}

export class PostFileService implements PostFileUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('post out port')
    private readonly savePostPort: SavePostPort,
    private readonly awsService: AwsService,
  ) {}

  postFile = async (
    dto: PostFileRequest,
    token: string,
    file: Express.Multer.File,
  ): Promise<number> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    const response = await this.awsService.fileUploadToS3(
      user.id + '/' + v4(),
      file,
    );

    const post = new Post(
      null,
      user.id,
      dto.type,
      dto.title,
      response,
      dto.major,
      null,
      user,
      null,
    );
    return (await this.savePostPort.save(post)).id;
  };
}

export class ReadDetailPostService implements ReadDetailPostUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('post out port')
    private readonly readPostPort: ReadPostPort,
  ) {}

  readDetailPost = async (postId: number, token: string): Promise<object> => {
    await this.readCurrentUserPort.verifyUser(token);

    return await this.readPostPort.readByIdOrFail(postId);
  };
}

export class RemovePostService implements RemovePostUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('post out port')
    private readonly readPostPort: ReadPostPort,
    @Inject('post out port')
    private readonly removePostPort: RemovePostPort,
  ) {}

  removePost = async (postId: number, token: string): Promise<void> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    if ((await this.readPostPort.readByIdOrFail(postId)).writer_id !== user.id)
      throw new ForbiddenException('작성자가 아님');

    // s3 object 삭제 요청 추가 자리

    await this.removePostPort.delete(postId);
  };
}

export class ReadRecommendedPostService implements ReadRecommendedUseCase {
  constructor(
    @Inject('post out port')
    private readonly readPostPort: ReadPostPort,
  ) {}

  readRecommendedPost = async (): Promise<object[]> => {
    const data = await this.readPostPort.readAllByRandom();

    if (data.length === 0) throw new HttpException('There is No Content', 204);

    return data;
  };
}

export class SearchPostService implements SearchPostUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('post out port')
    private readonly readPostPort: ReadPostPort,
  ) {}

  searchPost = async (
    dto: PostSearchRequest,
    token: string,
  ): Promise<object[]> => {
    await this.readCurrentUserPort.verifyUser(token);

    const data = await this.readPostPort.searchPost(dto);
    if (data.length === 0) throw new HttpException('There is No Content', 204);

    return data;
  };
}
