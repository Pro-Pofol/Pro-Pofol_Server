import { UserMajor } from 'src/domain/user/user.entity';

export class UserResponse {
  oauth_id: string;

  name: string;

  user_major: UserMajor;

  generation: number;

  profile_image: string;

  constructor(
    oauth_id: string,
    name: string,
    generation?: number,
    profileImage?: string,
    user_major?: UserMajor,
  ) {
    this.oauth_id = oauth_id;
    this.name = name;
    if (user_major) this.user_major = user_major;
    if (generation) this.generation = generation;
    if (profileImage) this.profile_image = profileImage;
  }
}
