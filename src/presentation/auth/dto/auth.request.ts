import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Major } from '../../../common/enums';

export class SignupRequest {
  @IsString({
    message: (validationArguments) =>
      `${validationArguments.property} : string이여야 합니다.`,
  })
  @IsOptional()
  name?: string;

  @IsNotEmpty({
    message: (validationArguments) =>
      `${validationArguments.property} : null일 수 없습니다.`,
  })
  @IsEnum(Major, {
    message: (validationArguments) =>
      `${validationArguments.property} : enum값이 아닙니다.`,
  })
  major: Major;

  @IsNotEmpty({
    message: (validationArguments) =>
      `${validationArguments.property} : null일 수 없습니다.`,
  })
  generation: number;

  @IsString({
    message: (validationArguments) =>
      `${validationArguments.property} : string 이여야 합니다.`,
  })
  @IsOptional()
  profile_image_url?: string;
}
