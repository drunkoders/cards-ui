import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '@models/Position';
import { PlayingCardType } from '@models/PlayingCardType';

export interface CardState {
  card: PlayingCardType;
  position: Position;
  isFaceUp: boolean;
}

/** Represents the state of the table */
type TableState = {
  /** contains the state of every card */
  cards: Record<string, CardState>;
};

const initialState: TableState = {
  cards: {},
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    initCards: (state, action: PayloadAction<{ cards: PlayingCardType[] }>) => {
      const { cards } = action.payload;

      cards.forEach((cardId) => {
        // eslint-disable-next-line no-param-reassign
        state.cards[cardId] = {
          card: cardId,
          position: { x: 0, y: 0 },
          isFaceUp: false,
        };
      });
    },
    updateCardPosition: (state, action: PayloadAction<{ cardId: PlayingCardType; position: Position }>) => {
      const { cardId, position } = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.cards[cardId].position = position;
    },
    updateCardFaceUp: (state, action: PayloadAction<{ cardId: PlayingCardType; isFaceUp: boolean }>) => {
      const { cardId, isFaceUp } = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.cards[cardId].isFaceUp = isFaceUp;
    },
  },
});

export const { initCards, updateCardPosition, updateCardFaceUp } = tableSlice.actions;

export default tableSlice.reducer;
