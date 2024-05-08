import { PostLinkRequest } from '../../../presentation/post/dto/post.request';

export interface PostLinkUseCase {
  postLink(req: PostLinkRequest, token: string): Promise<void>;
}

export interface PostFileUseCase {
  postFile(
    title: string,
    type: string,
    major: string,
    token: string,
  ): Promise<void>;
}
