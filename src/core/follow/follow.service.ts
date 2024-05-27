import { Inject } from '@nestjs/common';
import { ReadUserPort } from '../user/port/user.out.port';
import { ReadCurrentUserPort } from '../auth/port/auth.out.port';
import { Follow } from '../../domain/follow/follow.entity';
import { FollowUserUseCase } from './port/follow.in.port';
import {
  DeleteFollowPort,
  ReadFollowPort,
  SaveFollowPort,
} from './port/follow.out.port';

export class FollowUserService implements FollowUserUseCase {
  constructor(
    @Inject('user out port')
    private readonly readUserPort: ReadUserPort,
    @Inject('jwt')
    private readonly readCurrentUserPort: ReadCurrentUserPort,
    @Inject('follow out port')
    private readonly saveFollowPort: SaveFollowPort,
    @Inject('follow out port')
    private readonly deleteFollowPort: DeleteFollowPort,
    @Inject('follow out port')
    private readonly readFollowPort: ReadFollowPort,
  ) {}

  follow = async (id: string, token: string): Promise<void> => {
    const user = await this.readCurrentUserPort.verifyUser(token);

    const target = await this.readUserPort.findByIdOrFail(id);

    const follow = await this.readFollowPort.readByUserAndTarget(user, target);

    if (!follow) {
      await this.saveFollowPort.save(new Follow(user, target));
    } else {
      await this.deleteFollowPort.deleteById(follow.id);
    }
  };
}
