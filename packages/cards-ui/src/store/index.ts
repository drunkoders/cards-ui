import { configureStore, Store } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import type { RootState } from './rootReducer';

const createStore = (preloadedState?: RootState): Store =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type { RootState } from './rootReducer';

export default createStore;
