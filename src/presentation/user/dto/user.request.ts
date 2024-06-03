import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserMajor } from 'src/domain/user/user.entity';

export class UpdateMyInfoRequest {
  @IsString()
  @IsOptional()
  profile_image?: string;

  @IsNumber()
  @IsOptional()
  generation?: number;

  @IsEnum(UserMajor)
  @IsOptional()
  user_major?: UserMajor;
}
