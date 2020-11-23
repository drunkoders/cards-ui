import { PlayingCardType } from '@models/PlayingCardType';
import { Position } from '@models/Position';
import cardsReducer, { initCards, updateCardPosition } from '.';

describe('Cards reducer', () => {
  it('should handle initial state', () => {
    const expectedInitialState = { cards: {} };

    const initialState = cardsReducer(undefined, { type: 'sfdfdf' });

    expect(initialState).toEqual(expectedInitialState);
  });

  it('should handle initCards', () => {
    const expectedState = {
      cards: {
        spades_2: { card: 'spades_2', isFaceUp: false, position: { x: 0, y: 0 } },
        hearts_3: { card: 'hearts_3', isFaceUp: false, position: { x: 0, y: 0 } },
      },
    };

    const cards: PlayingCardType[] = ['spades_2', 'hearts_3'];

    const state = cardsReducer(undefined, initCards({ cards }));

    expect(state).toEqual(expectedState);
  });

  it('should handle updateCardPosition', () => {
    const position: Position = { x: 530, y: 244 };
    const payload = { cardId: 'spades_1' as PlayingCardType, position };
    const currentState = {
      cards: {
        spades_1: { card: 'spades_1' as PlayingCardType, isFaceUp: false, position: { x: 0, y: 0 } },
      },
    };
    const expectedState = { cards: { spades_1: { card: 'spades_1', isFaceUp: false, position } } };

    const state = cardsReducer(currentState, updateCardPosition(payload));

    expect(state).toEqual(expectedState);
  });
});
