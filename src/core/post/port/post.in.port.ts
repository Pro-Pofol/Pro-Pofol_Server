import {
  PostFileRequest,
  PostLinkRequest,
} from '../../../presentation/post/dto/post.request';
import { PostResponse } from '../../../presentation/post/dto/post.response';

export interface PostLinkUseCase {
  postLink(req: PostLinkRequest, token: string): Promise<void>;
}

export interface PostFileUseCase {
  postFile(
    dto: PostFileRequest,
    token: string,
    file: Express.Multer.File,
  ): Promise<string>;
}

export interface ReadDetailPostUseCase {
  readDetailPost(
    postId: number,
    token: string,
  ): Promise<object | null | undefined>;
}

export interface RemovePostUseCase {
  removePost(postId: number, token: string): Promise<void>;
}

export interface ReadRecommendedUseCase {
  readRecommendedPost(): Promise<object[]>;
}
