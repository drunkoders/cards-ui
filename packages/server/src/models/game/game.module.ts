import { Module } from '@nestjs/common';
import { GameResolver } from './game.resolver';

@Module({
  providers: [GameResolver],
})
export class GameModule {}
