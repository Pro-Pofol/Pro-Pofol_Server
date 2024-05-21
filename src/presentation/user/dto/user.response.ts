import { Major } from '../../../domain/post/post.entity';

export class UserResponse {
  oauth_id: string;

  name: string;

  major: Major;

  generation: number;

  profile_image: string;

  constructor(
    oauth_id: string,
    name: string,
    generation?: number,
    profileImage?: string,
    major?: Major,
  ) {
    this.oauth_id = oauth_id;
    this.name = name;
    if (major) this.major = major;
    if (generation) this.generation = generation;
    if (profileImage) this.profile_image = profileImage;
  }
}
