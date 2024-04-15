import { User } from '../../../domain/user/user.entity';

export interface ReadUserPort {
  findByOauthIdOrFail(oauthId: string): Promise<User>;
}

export interface ExistsUserPort {
  existsByOauthId(oauthId: string): Promise<boolean>;
}

export interface SaveUserPort {
  save(entity: User): Promise<User>;
}
