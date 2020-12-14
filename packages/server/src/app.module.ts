import * as path from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './models/game/game.module';
import { GameGatewayModule } from './gateways/game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.ENV_FILE || path.join(__dirname, '../../../.env'),
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
    }),
    GameModule,
    GameGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
