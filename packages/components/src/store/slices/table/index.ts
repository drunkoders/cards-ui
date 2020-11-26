import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '@models/Position';
import { PlayingCard } from '@models/PlayingCard';
import { Dimensions } from '@models/Dimensions';
import { generateRandomCard } from '@utils/generate-card';
import { generateRandomPositionWithinBoundaries } from '@utils/position-utils';
import { generateRandomCardDeck } from '@utils/generate-card-deck';
import { shuffleArray } from '@utils/array-utils';

export interface CardState {
  card?: PlayingCard;
  cards?: PlayingCard[];
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

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableDimensions: (state: TableState, action: PayloadAction<Dimensions>) => {
      state.dimensions = action.payload;
    },
    addRandomCardToTable: (state: TableState) => {
      const { name, suit, id } = generateRandomCard();
      state.cards[id] = {
        isFaceUp: Math.round(Math.random() * 100) % 2 === 0,
        position: state.dimensions ? generateRandomPositionWithinBoundaries(state.dimensions) : defaultPosition,
        card: { name, suit },
      };
    },
    addRandomCardDeckToTable: (state: TableState) => {
      const { cards, id } = generateRandomCardDeck();
      state.cards[id] = {
        isFaceUp: false,
        position: state.dimensions ? generateRandomPositionWithinBoundaries(state.dimensions) : defaultPosition,
        cards,
      };
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
      const cards = state.cards[cardDeckId].cards;

      const shuffledCards = shuffleArray(cards);

      state.cards[cardDeckId].cards = shuffledCards;
    },
  },
});

export const {
  setTableDimensions,
  addRandomCardToTable,
  addRandomCardDeckToTable,
  updateCardPosition,
  updateCardFaceUp,
  shuffleCardDeck,
} = tableSlice.actions;

export default tableSlice.reducer;
