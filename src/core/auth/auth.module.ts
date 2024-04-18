import { Module } from '@nestjs/common';
import { LoginService, SignupService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../../domain/user/user.repository';
import { JwtAdapter } from '../../infrastructure/jwt/jwt.adapter';
import { GoogleAuthAdapter } from '../../infrastructure/oauth/google.adapter';
import { KakaoAuthAdapter } from '../../infrastructure/oauth/kakao.adapter';
import { FacebookAuthAdaptor } from 'src/infrastructure/oauth/facebook.adapter';
import {
  LoginController,
  SignupController,
} from 'src/presentation/auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  controllers: [SignupController, LoginController],
  providers: [
    { provide: 'user out port', useClass: UserRepository },
    { provide: 'jwt', useClass: JwtAdapter },
    { provide: 'signup', useClass: SignupService },
    { provide: 'login', useClass: LoginService },
    { provide: 'google', useClass: GoogleAuthAdapter },
    { provide: 'kakao', useClass: KakaoAuthAdapter },
    { provide: 'facebook', useClass: FacebookAuthAdaptor },
  ],
})
export class AuthModule {}
