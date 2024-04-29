import { PostLinkUseCase } from './port/post.in.port';
import { PostLinkRequest } from '../../presentation/post/dto/post.request';
import { Post } from '../../domain/post/post.entity';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import { SavePostPort } from './port/post.out.port';
import { Inject } from '@nestjs/common';

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
