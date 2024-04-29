import { Module } from '@nestjs/common';
import { TipController } from '../../presentation/tip/tip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tip } from '../../domain/tip/tip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tip])],
  controllers: [TipController],
  providers: [],
})
export class TipModule {}
