import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  accessToken: string | null | undefined;
  expiredDate: string | null | undefined;
  refreshToken: string | null | undefined;
};
// Initial state
const initialState: AuthState = {
  accessToken: undefined,
  expiredDate: undefined,
  refreshToken: undefined,
};

// Actual Slice
export const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuth(state, action: PayloadAction<AuthState>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiredDate = action.payload.expiredDate;
    },
    reset: () => initialState,

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
});

const selectors = (<S extends { auth: AuthState }>() => {
  const getState = (state: S) => state.auth;
  const selectAccessToken = createSelector(
    getState,
    (state) => state.accessToken
  );
  const selectExpiredDate = createSelector(
    getState,
    (state) => state.expiredDate
  );
  const selectRefreshToken = createSelector(
    getState,
    (state) => state.refreshToken
  );

  const selectAuthState = createSelector(getState, (state) => state);

  return {
    selectAccessToken,
    selectExpiredDate,
    selectRefreshToken,
    selectAuthState,
  };
})();

// eslint-disable-next-line import/no-anonymous-default-export
export default { actions, reducer, selectors };
