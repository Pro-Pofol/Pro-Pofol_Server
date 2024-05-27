import { Follow } from '../../../domain/follow/follow.entity';
import { User } from '../../../domain/user/user.entity';

export interface SaveFollowPort {
  save(follow: Follow): Promise<Follow>;
}

export interface DeleteFollowPort {
  deleteById(id: number): Promise<void>;
}

export interface ReadFollowPort {
  readByUserAndTarget(user: User, target: User): Promise<Follow | null>;
}
