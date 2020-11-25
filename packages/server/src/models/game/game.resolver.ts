import {Resolver, Query} from '@nestjs/graphql';
import { Game } from "./game.model";

@Resolver(_of => Game)
export class GameResolver {

    @Query(_returns => [Game])
    async games(): Promise<Game[]> {
        return [{
            id: 0,
            creationDate: new Date()
        }];
    }
}
