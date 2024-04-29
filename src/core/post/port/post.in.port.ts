import { PostLinkRequest } from '../../../presentation/post/dto/post.request';

export interface PostLinkUseCase {
  postLink(req: PostLinkRequest, token: string): Promise<void>;
}
