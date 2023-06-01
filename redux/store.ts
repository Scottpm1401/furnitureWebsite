import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import { isDevEnv } from '../utils/common';
import { reducer } from './reducer';

export const store = configureStore({
  reducer,
  middleware: isDevEnv() ? [logger] : [],
  devTools: isDevEnv(),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
