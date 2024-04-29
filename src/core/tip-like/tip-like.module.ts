import { Module } from '@nestjs/common';
import { TipLikeController } from '../../presentation/tip-like/tip-like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipLike } from '../../domain/tip-like/tip-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipLike])],
  controllers: [TipLikeController],
  providers: [],
})
export class TipLikeModule {}
