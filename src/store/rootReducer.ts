import { combineReducers } from '@reduxjs/toolkit';

import cardsReducer from './slices/cards';

const rootReducer = combineReducers({
  cards: cardsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
