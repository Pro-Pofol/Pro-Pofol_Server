import { IsString, Length } from 'class-validator';

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
