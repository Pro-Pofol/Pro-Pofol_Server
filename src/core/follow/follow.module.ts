import { Module } from '@nestjs/common';
import { FollowController } from '../../presentation/follow/follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from '../../domain/follow/follow.entity';
import { User } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';
import { JwtAdapter } from '../../infrastructure/jwt/jwt.adapter';
import { FollowUserService } from './follow.service';
import { FollowRepository } from '../../domain/follow/follow.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follow, User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [
    { provide: 'user out port', useClass: UserRepository },
    { provide: 'follow out port', useClass: FollowRepository },
    { provide: 'jwt', useClass: JwtAdapter },
    { provide: 'followUser', useClass: FollowUserService },
  ],
  controllers: [FollowController],
})
export class FollowModule {}
