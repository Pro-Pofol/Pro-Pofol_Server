import { Module } from '@nestjs/common';
import { UserController } from '../../presentation/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';
import { GetUserInfoService } from './user.service';
import { JwtAdapter } from '../../infrastructure/jwt/jwt.adapter';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [
    { provide: 'user out port', useClass: UserRepository },
    { provide: 'getUser', useClass: GetUserInfoService },
    { provide: 'jwt', useClass: JwtAdapter },
  ],
  controllers: [UserController],
})
export class UserModule {}
