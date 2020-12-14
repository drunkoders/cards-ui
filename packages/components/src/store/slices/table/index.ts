import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '@models/Position';
import { Dimensions } from '@models/Dimensions';
import { generateRandomPlayingCard, generateRandomUnoCard } from '@utils/generate-card';
import { generateRandomPositionWithinBoundaries } from '@utils/position-utils';
import { generateRandomPlayingCardDeck, generateRandomUnoCardDeck } from '@utils/generate-card-deck';
import { shuffleArray } from '@utils/array-utils';
import { Card } from '@models/Card';

export interface CardState {
  cards: Card | Card[];
  position: Position;
  isFaceUp: boolean;
}

/** Represents the state of the table */
type TableState = {
  /** dimensions of the table */
  dimensions?: Dimensions;
  /** contains the state of every card */
  cards: Record<string, CardState>;
};

const initialState: TableState = {
  cards: {},
};

const defaultPosition: Position = { x: 0, y: 0 };

const createInitialCardState = (cards, dimensions, randomFace): CardState => ({
  isFaceUp: randomFace && Math.round(Math.random() * 100) % 2 === 0,
  position: dimensions ? generateRandomPositionWithinBoundaries(dimensions) : defaultPosition,
  cards,
});

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableDimensions: (state: TableState, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
    addRandomPlayingCard: (state: TableState) => {
      const card = generateRandomPlayingCard();
      state.cards[card.id] = createInitialCardState(card, state.dimensions, true);
    },
    addRandomPlayingCardDeck: (state: TableState) => {
      const { cards, id } = generateRandomPlayingCardDeck();
      state.cards[id] = createInitialCardState(cards, state.dimensions, false);
    },
    addRandomUnoCard: (state: TableState) => {
      const card = generateRandomUnoCard();
      state.cards[card.id] = createInitialCardState(card, state.dimensions, true);
    },
    addRandomUnoCardDeck: (state: TableState) => {
      const { cards, id } = generateRandomUnoCardDeck();
      state.cards[id] = createInitialCardState(cards, state.dimensions, false);
    },
    updateCardPosition: (state, action: PayloadAction<{ cardId: string; position: Position }>) => {
      const { cardId, position } = action.payload;

      state.cards[cardId].position = position;
    },
    updateCardFaceUp: (state, action: PayloadAction<{ cardId: string; isFaceUp: boolean }>) => {
      const { cardId, isFaceUp } = action.payload;

      state.cards[cardId].isFaceUp = isFaceUp;
    },
    shuffleCardDeck: (state: TableState, action: PayloadAction<string>) => {
      const cardDeckId = action.payload;
      const { cards } = state.cards[cardDeckId];

      if (Array.isArray(cards)) {
        const shuffledCards = shuffleArray(cards);
        state.cards[cardDeckId].cards = shuffledCards;
      }
    },
  },
});

export const {
  setTableDimensions,
  addRandomPlayingCard,
  addRandomUnoCard,
  addRandomPlayingCardDeck,
  addRandomUnoCardDeck,
  updateCardPosition,
  updateCardFaceUp,
  shuffleCardDeck,
} = tableSlice.actions;

export default tableSlice.reducer;
