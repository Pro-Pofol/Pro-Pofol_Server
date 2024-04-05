import { Module } from '@nestjs/common';
import { TipController } from './tip.controller';
import { TipService } from './tip.service';

@Module({
  controllers: [TipController],
  providers: [TipService],
})
export class TipModule {}
