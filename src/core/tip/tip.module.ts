import { Module } from '@nestjs/common';
import { TipController } from '../../presentation/tip/tip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tip } from '../../domain/tip/tip.entity';
import { JwtAdapter } from '../../infrastructure/jwt/jwt.adapter';
import { TipRepository } from '../../domain/tip/tip.repository';
import { User } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';
import { ModifyTipService, WriteTipService } from './tip.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tip, User]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
  controllers: [TipController],
  providers: [
    { provide: 'jwt', useClass: JwtAdapter },
    { provide: 'tip out port', useClass: TipRepository },
    { provide: 'user out port', useClass: UserRepository },
    { provide: 'writeTip', useClass: WriteTipService },
    { provide: 'modifyTip', useClass: ModifyTipService },
  ],
})
export class TipModule {}
