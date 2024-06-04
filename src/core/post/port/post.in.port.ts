import {
  PostFileRequest,
  PostLinkRequest,
  PostSearchRequest,
} from '../../../presentation/post/dto/post.request';

export interface PostLinkUseCase {
  postLink(req: PostLinkRequest, token: string): Promise<number>;
}

export interface PostFileUseCase {
  postFile(
    dto: PostFileRequest,
    token: string,
    file: Express.Multer.File,
  ): Promise<number>;
}

export interface ReadDetailPostUseCase {
  readDetailPost(
    postId: number,
    token: string,
  ): Promise<object>;
}

export interface RemovePostUseCase {
  removePost(postId: number, token: string): Promise<void>;
}

export interface ReadRecommendedUseCase {
  readRecommendedPost(): Promise<object[]>;
}

export interface SearchPostUseCase {
  searchPost(dto: PostSearchRequest, token: string): Promise<object[]>;
}
