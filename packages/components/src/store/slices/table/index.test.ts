/* eslint-disable max-lines */
import { Position } from '@models/Position';
import { PlayingCard, PlayingCardName, PlayingCardSuit } from '@models/PlayingCard';
import tableReducer, {
  addRandomCardToTable,
  setCards,
  setTableDimensions,
  updateCardFaceUp,
  updateCardPosition,
} from '.';

describe('Cards reducer', () => {
  it('should handle initial state', () => {
    const expectedInitialState = { cards: {} };

    const initialState = tableReducer(undefined, { type: 'sfdfdf' });

    expect(initialState).toEqual(expectedInitialState);
  });

  describe('setTableDimensions', () => {
    it('should set the table dimensions', () => {
      const expectedState = {
        dimensions: { width: 600, height: 430 },
        cards: {},
      };

      const state = tableReducer(undefined, setTableDimensions({ width: 600, height: 430 }));

      expect(state).toEqual(expectedState);
    });
  });

  describe('setCards', () => {
    it('should set table cards', () => {
      const expectedState = {
        cards: {
          1: {
            card: { id: '1', name: PlayingCardName.Two, suit: PlayingCardSuit.Spades },
            isFaceUp: false,
            position: { x: 0, y: 0 },
          },
          2: {
            card: { id: '2', name: PlayingCardName.Three, suit: PlayingCardSuit.Hearts },
            isFaceUp: false,
            position: { x: 0, y: 0 },
          },
        },
      };

      const cards: PlayingCard[] = [
        { id: '1', name: PlayingCardName.Two, suit: PlayingCardSuit.Spades },
        { id: '2', name: PlayingCardName.Three, suit: PlayingCardSuit.Hearts },
      ];

      const state = tableReducer(undefined, setCards(cards));

      expect(state).toEqual(expectedState);
    });
  });

  describe('addRandomCardToTable', () => {
    it('should generate a random card and add it to the table', () => {
      const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

      const state = tableReducer({ cards: {}, dimensions: { width: 300, height: 140 } }, addRandomCardToTable());
      const [cardState] = Object.values(state.cards);

      expect([false, true]).toContain(cardState.isFaceUp);

      expect(cardState.position.x).toBeLessThanOrEqual(300);
      expect(cardState.position.y).toBeLessThanOrEqual(140);

      expect(cardState.card.id).toMatch(uuidRegExp);
      expect(Object.values(PlayingCardSuit)).toContain(cardState.card.suit);
      expect(Object.values(PlayingCardName)).toContain(cardState.card.name);
    });
  });

  describe('updateCardPosition', () => {
    it('should update card position', () => {
      const position: Position = { x: 530, y: 244 };
      const payload = { cardId: '1', position };
      const currentState = {
        cards: {
          1: {
            card: { id: '1', name: PlayingCardName.Two, suit: PlayingCardSuit.Spades },
            isFaceUp: false,
            position: { x: 0, y: 0 },
          },
        },
      };
      const expectedState = {
        cards: {
          1: { card: { id: '1', name: PlayingCardName.Two, suit: PlayingCardSuit.Spades }, isFaceUp: false, position },
        },
      };

      const state = tableReducer(currentState, updateCardPosition(payload));

      expect(state).toEqual(expectedState);
    });
  });

  describe('updateCardFaceUp', () => {
    it('should set card face up', () => {
      const payload = { cardId: '1', isFaceUp: true };
      const initialState = {
        cards: {
          1: {
            card: { id: '1', name: PlayingCardName.Two, suit: PlayingCardSuit.Spades },
            position: { x: 0, y: 0 },
            isFaceUp: false,
          },
        },
      };
      const expectedState = {
        cards: {
          1: {
            card: { id: '1', name: PlayingCardName.Two, suit: PlayingCardSuit.Spades },
            position: { x: 0, y: 0 },
            isFaceUp: true,
          },
        },
      };

      const state = tableReducer(initialState, updateCardFaceUp(payload));

      expect(state).toEqual(expectedState);
    });
  });
});
