import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Position } from '@models/Position';

type CardSliceState = {
  positions: Record<string, Position>;
};

const initialState: CardSliceState = {
  positions: {},
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    initCardPositions: (state, action: PayloadAction<{ cards: string[] }>) => {
      const { cards } = action.payload;

      cards.forEach((cardId: string) => {
        // eslint-disable-next-line no-param-reassign
        state.positions[cardId] = { x: 0, y: 0 };
      });
    },
    updateCardPosition: (state, action: PayloadAction<{ cardId: string; position: Position }>) => {
      const { cardId, position } = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.positions[cardId] = position;
    },
  },
});

export const { initCardPositions, updateCardPosition } = cardsSlice.actions;

export default cardsSlice.reducer;
