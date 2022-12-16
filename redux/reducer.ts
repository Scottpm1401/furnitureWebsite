import { combineReducers } from 'redux';
import { PersistConfig, persistReducer } from 'redux-persist';

import authReducer from './reducers/authReducer';
import globalReducer from './reducers/globalReducer';
import userReducer from './reducers/userReducer';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: require('redux-persist/lib/storage').default,
  whitelist: ['auth', 'global'],
};

export const reducer = (() => {
  const rootReducer = combineReducers({
    global: globalReducer.reducer,
    auth: authReducer.reducer,
    user: userReducer.reducer,
  });

  return persistReducer(persistConfig, rootReducer);
})();

export const actions = {
  global: globalReducer.actions,
  auth: authReducer.actions,
  user: userReducer.actions,
} as const;

export const selectors = {
  global: globalReducer.selectors,
  auth: authReducer.selectors,
  user: userReducer.selectors,
} as const;
