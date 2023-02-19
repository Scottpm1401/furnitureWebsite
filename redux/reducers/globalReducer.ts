import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GlobalState = {
  isCollapse: boolean;
};
// Initial state
const initialState: GlobalState = {
  isCollapse: false,
};

// Actual Slice
export const { actions, reducer } = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsCollapse(state, action: PayloadAction<boolean>) {
      state.isCollapse = action.payload;
    },
    // Action to set the authentication status
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
});

const selectors = (<S extends { global: GlobalState }>() => {
  const getState = (state: S) => state.global;
  const getIsCollapse = createSelector(getState, (state) => state.isCollapse);

  return { getIsCollapse };
})();

// eslint-disable-next-line import/no-anonymous-default-export
export default { actions, reducer, selectors };
