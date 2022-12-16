import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserInfoType } from '../../models/user';

export type UserState = {
  _id: string;
  displayName?: string;
  email: string;
  username: string;
  role: 'ADMIN' | 'USER';
  birthday: string;
  info?: UserInfoType;
};
// Initial state
const initialState: UserState = {
  _id: '',
  email: '',
  username: '',
  role: 'USER',
  birthday: '',
};

// Actual Slice
export const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the authentication status
    setUser(state, action: PayloadAction<UserState>) {
      state._id = action.payload._id;
      state.birthday = action.payload.birthday;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.info = action.payload.info;
      state.role = action.payload.role;
      state.username = action.payload.username;
    },

    reset: () => initialState,

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
});

const selectors = (<S extends { user: UserState }>() => {
  const getState = (state: S) => state.user;
  const selectUser = createSelector(getState, (state) => state);
  const selectUserId = createSelector(getState, (state) => state._id);
  const isAdmin = createSelector(getState, (state) => state.role === 'ADMIN');

  return {
    selectUser,
    selectUserId,
    isAdmin,
  };
})();

// eslint-disable-next-line import/no-anonymous-default-export
export default { actions, reducer, selectors };
