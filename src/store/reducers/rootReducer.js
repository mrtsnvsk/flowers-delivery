import { combineReducers } from 'redux';

import authReducer from './authReducer';
import searchReducer from './searchReducer';
import orderReducer from './orderReducer';
import favoritesReducer from './favoritesReducer';
import modalsReducer from './modalsReducer';

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  order: orderReducer,
  favorites: favoritesReducer,
  modals: modalsReducer,
});
