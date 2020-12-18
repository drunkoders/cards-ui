/* eslint-disable max-lines */
import { Position } from '@models/Position';
import { allPlayingCardNames, allPlayingCardSuits, PlayingCard } from '@models/PlayingCard';
import * as arrayUtils from '@utils/array-utils';
import tableReducer, {
  addRandomPlayingCard,
  addRandomPlayingCardDeck,
  setTableDimensions,
  updateCardFaceUp,
  updateCardPosition,
  shuffleCardDeck,
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

  describe('addRandomPlayingCard', () => {
    it('should generate a random card and add it to the table', () => {
      const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

      const state = tableReducer({ cards: {}, dimensions: { width: 300, height: 140 } }, addRandomPlayingCard());
      const [cardState] = Object.values(state.cards);
      const [cardId] = Object.keys(state.cards);
      const card = cardState.cards as PlayingCard;

      expect([false, true]).toContain(cardState.isFaceUp);

      expect(cardState.position.x).toBeLessThanOrEqual(300);
      expect(cardState.position.y).toBeLessThanOrEqual(140);

      expect(cardId).toMatch(uuidRegExp);
      expect(allPlayingCardSuits).toContain(card.suit);
      expect(allPlayingCardNames).toContain(card.name);
    });

    it('should generate a random card with default position', () => {
      const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

      const state = tableReducer({ cards: {} }, addRandomPlayingCard());
      const [cardState] = Object.values(state.cards);
      const [cardId] = Object.keys(state.cards);
      const card = cardState.cards as PlayingCard;

      expect([false, true]).toContain(cardState.isFaceUp);

      expect(cardState.position.x).toEqual(0);
      expect(cardState.position.y).toEqual(0);

      expect(cardId).toMatch(uuidRegExp);
      expect(allPlayingCardSuits).toContain(card.suit);
      expect(allPlayingCardNames).toContain(card.name);
    });
  });

  describe('addRandomPlayingCardDeck', () => {
    it('should generate a random card deck and add it to the table', () => {
      const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

      const state = tableReducer({ cards: {}, dimensions: { width: 300, height: 140 } }, addRandomPlayingCardDeck());
      const [cardId] = Object.keys(state.cards);
      const [cardState] = Object.values(state.cards);

      expect([false, true]).toContain(cardState.isFaceUp);

      expect(cardState.position.x).toBeLessThanOrEqual(300);
      expect(cardState.position.y).toBeLessThanOrEqual(140);

      expect(cardId).toMatch(uuidRegExp);
      expect(cardState.cards).toHaveLength(52);
    });

    it('should generate a random card with default position', () => {
      const uuidRegExp = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

      const state = tableReducer({ cards: {} }, addRandomPlayingCardDeck());
      const [cardId] = Object.keys(state.cards);
      const [cardState] = Object.values(state.cards);

      expect([false, true]).toContain(cardState.isFaceUp);

      expect(cardState.position.x).toEqual(0);
      expect(cardState.position.y).toEqual(0);

      expect(cardId).toMatch(uuidRegExp);
      expect(cardState.cards).toHaveLength(52);
    });
  });

  describe('updateCardPosition', () => {
    it('should update card position', () => {
      const position: Position = { x: 530, y: 244 };
      const payload = { cardId: '1', position };
      const currentState = {
        cards: {
          1: {
            cards: { id: '1', type: 'PlayingCard', name: '2', suit: 'spades' },
            isFaceUp: false,
            position: { x: 0, y: 0 },
          },
        },
      };
      const expectedState = {
        cards: {
          1: {
            cards: { id: '1', type: 'PlayingCard', name: '2', suit: 'spades' },
            isFaceUp: false,
            position,
          },
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
            cards: { id: '1', type: 'PlayingCard', name: '2', suit: 'spades' },
            position: { x: 0, y: 0 },
            isFaceUp: false,
          },
        },
      };
      const expectedState = {
        cards: {
          1: {
            cards: { id: '1', type: 'PlayingCard', name: '2', suit: 'spades' },
            position: { x: 0, y: 0 },
            isFaceUp: true,
          },
        },
      };

      const state = tableReducer(initialState, updateCardFaceUp(payload));

      expect(state).toEqual(expectedState);
    });
  });

  describe('shuffleCardDeck', () => {
    it('should shuffle cards', () => {
      const shuffledCards = [
        { id: '3', type: 'PlayingCard', name: '3', suit: 'spades' },
        { id: '1', type: 'PlayingCard', name: '2', suit: 'spades' },
      ];
      jest.spyOn(arrayUtils, 'shuffleArray').mockReturnValue(shuffledCards);

      const cardDeckId = '1';

      const initialState = {
        cards: {
          1: {
            cards: [
              { id: '1', type: 'PlayingCard', name: '2', suit: 'spades' },
              { id: '3', type: 'PlayingCard', name: '3', suit: 'spades' },
            ],
            position: { x: 0, y: 0 },
            isFaceUp: false,
          },
        },
      };

      const expectedState = {
        cards: {
          1: {
            cards: shuffledCards,
            position: { x: 0, y: 0 },
            isFaceUp: false,
          },
        },
      };

      const state = tableReducer(initialState, shuffleCardDeck(cardDeckId));

      expect(state).toEqual(expectedState);
    });
  });
});
