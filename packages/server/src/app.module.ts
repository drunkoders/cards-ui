import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './models/game/game.module';
import { GameGatewayModule } from './gateways/game/game.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true
    }),
    GameModule,
    GameGatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
