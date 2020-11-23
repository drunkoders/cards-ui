import { PlayingCardType } from '@models/PlayingCardType';
import { Position } from '@models/Position';
import tableReducer, { initCards, updateCardFaceUp, updateCardPosition } from '.';

describe('Cards reducer', () => {
  it('should handle initial state', () => {
    const expectedInitialState = { cards: {} };

    const initialState = tableReducer(undefined, { type: 'sfdfdf' });

    expect(initialState).toEqual(expectedInitialState);
  });

  describe('initTableState', () => {
    it('should init table state', () => {
      const expectedState = {
        cards: {
          spades_2: { card: 'spades_2', isFaceUp: false, position: { x: 0, y: 0 } },
          hearts_3: { card: 'hearts_3', isFaceUp: false, position: { x: 0, y: 0 } },
        },
      };

      const cards: PlayingCardType[] = ['spades_2', 'hearts_3'];

      const state = tableReducer(undefined, initCards({ cards }));

      expect(state).toEqual(expectedState);
    });
  });

  describe('updateCardPosition', () => {
    it('should update card position', () => {
      const position: Position = { x: 530, y: 244 };
      const payload = { cardId: 'spades_1' as PlayingCardType, position };
      const currentState = {
        cards: {
          spades_1: { card: 'spades_1' as PlayingCardType, isFaceUp: false, position: { x: 0, y: 0 } },
        },
      };
      const expectedState = { cards: { spades_1: { card: 'spades_1', isFaceUp: false, position } } };

      const state = tableReducer(currentState, updateCardPosition(payload));

      expect(state).toEqual(expectedState);
    });
  });

  describe('updateCardFaceUp', () => {
    it('should set card face up', () => {
      const payload = { cardId: 'spades_1' as PlayingCardType, isFaceUp: true };
      const initialState = {
        cards: { spades_1: { card: 'spades_1' as PlayingCardType, position: { x: 0, y: 0 }, isFaceUp: false } },
      };
      const expectedState = {
        cards: { spades_1: { card: 'spades_1' as PlayingCardType, position: { x: 0, y: 0 }, isFaceUp: true } },
      };

      const state = tableReducer(initialState, updateCardFaceUp(payload));

      expect(state).toEqual(expectedState);
    });
  });
});
