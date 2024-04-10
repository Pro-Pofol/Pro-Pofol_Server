import { Module } from '@nestjs/common';
import { TipLikeController } from '../../presentation/tip-like/tip-like.controller';
import { TipLikeService } from './tip-like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipLike } from '../../domain/tip-like/tip-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipLike])],
  controllers: [TipLikeController],
  providers: [TipLikeService],
})
export class TipLikeModule {}
