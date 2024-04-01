import { Module } from '@nestjs/common';
import { TipLikeController } from './tip-like.controller';
import { TipLikeService } from './tip-like.service';

@Module({
  controllers: [TipLikeController],
  providers: [TipLikeService]
})
export class TipLikeModule {}
