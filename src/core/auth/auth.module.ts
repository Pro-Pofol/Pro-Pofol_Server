import { Module } from '@nestjs/common';
import { AuthController } from '../../presentation/auth/auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../../domain/user/user.repository';
import { JwtAdapter } from '../../infrastructure/jwt/jwt.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [UserRepository, JwtAdapter, AuthService],
})
export class AuthModule {}
