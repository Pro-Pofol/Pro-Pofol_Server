import { User } from '../../../domain/user/user.entity';

export interface ReadUserPort {
  readByOauthId(oauthId: string): Promise<User | null>;
  readByOauthIdOrFail(oauthId: string): Promise<User>;
}

export interface SaveUserPort {
  save(entity: User): Promise<User>;
}
