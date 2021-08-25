import { combineReducers } from 'redux';

import authReducer from './authReducer';
import searchReducer from './searchReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  order: orderReducer,
});
