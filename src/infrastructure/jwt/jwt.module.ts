import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../../domain/user/user.repository';
import { JwtAdapter } from './jwt.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  providers: [UserRepository, JwtAdapter],
})
export class JwtCustomModule {}
