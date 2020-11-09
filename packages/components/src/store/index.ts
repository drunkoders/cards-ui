import { configureStore, DeepPartial, Store } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import type { RootState } from './rootReducer';

const createStore = (preloadedState?: RootState): Store =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as DeepPartial<RootState>,
  });

export { RootState } from './rootReducer';

export default createStore;
