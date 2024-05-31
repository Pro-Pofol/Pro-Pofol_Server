import { UpdateMyInfoRequest } from 'src/presentation/user/dto/user.request';
import { User } from '../../../domain/user/user.entity';

export interface ReadUserPort {
  findByIdOrFail(id: string): Promise<User>;
}

export interface ExistsUserPort {
  existsById(id: string): Promise<boolean>;
}

export interface SaveUserPort {
  save(entity: User): Promise<User>;
}

export interface UpdateUserPort {
  update(id: string, dto: UpdateMyInfoRequest): Promise<void>;
}
