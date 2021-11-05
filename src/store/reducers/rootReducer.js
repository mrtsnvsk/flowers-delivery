import { combineReducers } from 'redux';

import authReducer from './authReducer';
import searchReducer from './searchReducer';
import orderReducer from './orderReducer';
import favoritesReducer from './favoritesReducer';
import modalsReducer from './modalsReducer';
import catalogLayoutReducer from './catalogLayoutReducer';
import categoriesReducer from './categoriesReducer';
import productsReducer from './productsReducer';
import localizationReducer from './localizationReducer';

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  order: orderReducer,
  favorites: favoritesReducer,
  modals: modalsReducer,
  catalogLayout: catalogLayoutReducer,
  categories: categoriesReducer,
  products: productsReducer,
  localization: localizationReducer,
});
