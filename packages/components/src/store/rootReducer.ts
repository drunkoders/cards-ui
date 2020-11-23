import { combineReducers } from '@reduxjs/toolkit';

import tableReducer from '@store/slices/table';

const rootReducer = combineReducers({
  table: tableReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
