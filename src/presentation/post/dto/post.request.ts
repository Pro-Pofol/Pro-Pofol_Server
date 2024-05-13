import { IsEnum, IsString, Length } from 'class-validator';
import { Major, PostType } from '../../../domain/post/post.entity';

export class PostLinkRequest {
  @IsString({
    message: (validationArguments) =>
      `${validationArguments.property} : string이여야 합니다.`,
  })
  @Length(1, 55, {
    message: (validationArguments) =>
      `${validationArguments.property} : 최소 1자 최대 55자여야 합니다.`,
  })
  title: string;

  @IsString({
    message: (validationArguments) =>
      `${validationArguments.property} : string이여야 합니다.`,
  })
  @Length(1, 93, {
    message: (validationArguments) =>
      `${validationArguments.property} : 최소 1자 최대 93자여야 합니다.`,
  })
  link: string;

  @IsEnum(PostType, {
    message: (validationArguments) =>
      `${validationArguments.property} : enum이여야 합니다.`,
  })
  @Length(1, 17, {
    message: (validationArguments) =>
      `${validationArguments.property} : 최소 1자 최대 17자여야 합니다.`,
  })
  type: PostType;

  @IsEnum(Major, {
    message: (validationArguments) =>
      `${validationArguments.property} : enum이여야 합니다.`,
  })
  major: Major;
}

export class PostFileRequest {
  @IsString({
    message: (validationArguments) =>
      `${validationArguments.property} : string이여야 합니다.`,
  })
  @Length(1, 55, {
    message: (validationArguments) =>
      `${validationArguments.property} : 최소 1자 최대 55자여야 합니다.`,
  })
  title: string;

  @IsEnum(PostType, {
    message: (validationArguments) =>
      `${validationArguments.property} : enum이여야 합니다.`,
  })
  type: PostType;

  @IsEnum(Major, {
    message: (validationArguments) =>
      `${validationArguments.property} : enum이여야 합니다.`,
  })
  major: Major;
}
