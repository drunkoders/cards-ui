import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Game {
  @Field(_type => ID)
  id: number;
  /**
   * The date it was created
   */
  creationDate: Date;
}
