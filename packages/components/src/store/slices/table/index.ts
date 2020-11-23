import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '@models/Position';
import { PlayingCard } from '@models/PlayingCard';
import { Dimensions } from '@models/Dimensions';
import { generateRandomCard } from '@utils/generate-card';
import { generateRandomPositionWithinBoundaries } from '@utils/position-utils';

export interface CardState {
  card: PlayingCard;
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
    setCards: (state, action: PayloadAction<PlayingCard[]>) => {
      const cards = action.payload;

      cards.forEach((card) => {
        if (state.cards[card.id]) {
          return;
        }
        state.cards[card.id] = {
          card,
          position: { x: 0, y: 0 },
          isFaceUp: false,
        };
      });
    },
    addRandomCardToTable: (state: TableState) => {
      const card = generateRandomCard();
      state.cards[card.id] = {
        isFaceUp: Math.round(Math.random() * 100) % 2 === 0,
        position: state.dimensions ? generateRandomPositionWithinBoundaries(state.dimensions) : defaultPosition,
        card,
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
  },
});

export const {
  setTableDimensions,
  setCards,
  addRandomCardToTable,
  updateCardPosition,
  updateCardFaceUp,
} = tableSlice.actions;

export default tableSlice.reducer;
