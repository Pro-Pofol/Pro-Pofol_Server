import { Module } from '@nestjs/common';
import { UserController } from '../../presentation/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [{ provide: 'user out port', useClass: UserRepository }],
  controllers: [UserController],
})
export class UserModule {}
