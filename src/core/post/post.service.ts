import {
  PostFileUseCase,
  PostLinkUseCase,
  ReadDetailPostUseCase,
} from './port/post.in.port';
import {
  PostFileRequest,
  PostLinkRequest,
} from '../../presentation/post/dto/post.request';
import { Post } from '../../domain/post/post.entity';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import { ReadPostPort, SavePostPort } from './port/post.out.port';
import { BadRequestException, Inject } from '@nestjs/common';
import { ManagedUpload, PutObjectRequest } from 'aws-sdk/clients/s3';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

export class PostLinkService implements PostLinkUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('post out port')
    private readonly savePostPort: SavePostPort,
  ) {}

  postLink = async (req: PostLinkRequest, token: string): Promise<void> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    const post = new Post(
      null,
      user.id,
      req.type,
      req.title,
      null,
      req.link,
      req.major,
      null,
      user,
      null,
    );

    await this.savePostPort.save(post);
  };
}

export class PostFileService implements PostFileUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('post out port')
    private readonly savePostPort: SavePostPort,
    @InjectAwsService(S3) private readonly s3: S3,
  ) {}

  postFile = async (
    dto: PostFileRequest,
    token: string,
    file: Express.Multer.File,
  ): Promise<string> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    const params: PutObjectRequest = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: String(file.originalname),
      Body: file.buffer,
    };

    let response: ManagedUpload.SendData;

    try {
      response = await this.s3.upload(params).promise();
    } catch (err) {
      console.error(err);
      throw new BadRequestException('파일 업로드 실패');
    }

    const post = new Post(
      null,
      user.id,
      dto.type,
      dto.title,
      response.Location,
      null,
      dto.major,
      null,
      user,
      null,
    );

    await this.savePostPort.save(post);

    return response.Location;
  };
}

export class ReadDetailPostService implements ReadDetailPostUseCase {
  constructor(
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('post out port')
    private readonly readPostPort: ReadPostPort,
  ) {}

  readDetailPost = async (
    postId: number,
    token: string,
  ): Promise<object | null | undefined> => {
    await this.readCurrentUserPort.verifyUser(token);

    await this.readPostPort.readByIdOrFail(postId);


    return await this.readPostPort.readDetailPost(postId);
  };
}
