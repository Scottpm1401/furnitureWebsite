import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GlobalState = {};
// Initial state
const initialState: GlobalState = {};

// Actual Slice
export const { actions, reducer } = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // Action to set the authentication status
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
});

const selectors = (<S extends { global: GlobalState }>() => {
  const getState = (state: S) => state.global;

  return {};
})();

// eslint-disable-next-line import/no-anonymous-default-export
export default { actions, reducer, selectors };
