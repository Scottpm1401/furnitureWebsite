import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { AppState } from '../store';

// Type for our state
export interface AuthState {
  authState: boolean;
}

// Initial state
const initialState: AuthState = {
  authState: false,
};

// Actual Slice
export const globalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
});

export const { setAuthState } = globalSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export default globalSlice.reducer;
