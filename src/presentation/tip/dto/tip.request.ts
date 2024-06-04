import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { SortType } from 'src/domain/post/post.entity';

export class WriteTipRequest {
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
  content: string;
}

export class ModifyTipRequest {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}

export class SearchTipRequest {
  @IsString({
    message: (validationArguments) =>
      `${validationArguments.property} : string이여야 합니다.`,
  })
  keyword: string;

  @IsEnum(SortType, {
    message: (validationArguments) =>
      `${validationArguments.property} : enum이여야 합니다.`,
  })
  sort: SortType;
}
