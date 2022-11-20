import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import logger from 'redux-logger';

import { globalSlice } from './reducer';

const makeStore = (context: Context) =>
  configureStore({
    reducer: {
      [globalSlice.name]: globalSlice.reducer,
    },
    middleware: [logger],
    devTools: true,
  });
export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore['getState']>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
