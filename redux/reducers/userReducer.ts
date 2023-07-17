import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProductCartType } from '../../models/cart';
import { Role, UserType } from '../../models/user';

const initialState: UserType = {
  _id: '',
  email: '',
  username: '',
  role: Role.user,
  birthday: '',
  cart_total: 0,
  cart: [],
};

// Actual Slice
export const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the authentication status
    setUser(state, action: PayloadAction<UserType>) {
      state._id = action.payload._id;
      state.birthday = action.payload.birthday;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.info = action.payload.info;
      state.role = action.payload.role;
      state.username = action.payload.username;
      state.cart = action.payload.cart;
      state.cart_total = action.payload.cart_total;
    },

    setUserCart(state, action: PayloadAction<ProductCartType[]>) {
      state.cart = action.payload;
    },

    setUserCartTotal(state, action: PayloadAction<number>) {
      state.cart_total = action.payload;
    },

    reset: () => initialState,

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
});

const selectors = (<S extends { user: UserType }>() => {
  const getState = (state: S) => state.user;
  const selectUser = createSelector(getState, (state) => state);
  const selectUserId = createSelector(getState, (state) => state._id);
  const selectUserCart = createSelector(getState, (state) => state.cart);
  const selectCartTotal = createSelector(getState, (state) => state.cart_total);
  const isAdmin = createSelector(
    getState,
    (state) =>
      state.role === Role.admin ||
      state.role === Role.super_admin ||
      state.role === Role.owner
  );

  const isSuperAdmin = createSelector(
    getState,
    getState,
    (state) => state.role === Role.super_admin || state.role === Role.owner
  );

  const isOwner = createSelector(
    getState,

    getState,
    (state) => state.role === Role.owner
  );

  return {
    selectUser,
    selectUserId,
    isAdmin,
    isSuperAdmin,
    isOwner,
    selectUserCart,
    selectCartTotal,
  };
})();

// eslint-disable-next-line import/no-anonymous-default-export
export default { actions, reducer, selectors };
