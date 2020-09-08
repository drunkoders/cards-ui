import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Position } from '@models/Position';
import type { PlayingCardType } from '@models/PlayingCardType';

/** Represents the state of the cards */
type CardSliceState = {
  /** contains the positions of every card */
  positions: { [key in PlayingCardType]?: Position };
};

const initialState = {
  positions: {},
} as CardSliceState;

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    initCardPositions: (state, action: PayloadAction<{ cards: PlayingCardType[] }>) => {
      const { cards } = action.payload;

      cards.forEach((cardId) => {
        // eslint-disable-next-line no-param-reassign
        state.positions[cardId] = { x: 0, y: 0 };
      });
    },
    updateCardPosition: (state, action: PayloadAction<{ cardId: PlayingCardType; position: Position }>) => {
      const { cardId, position } = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.positions[cardId] = position;
    },
  },
});

export const { initCardPositions, updateCardPosition } = cardsSlice.actions;

export default cardsSlice.reducer;
