import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from '../../presentation/follow/follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from '../../domain/follow/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
