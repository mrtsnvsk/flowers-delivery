import * as constant from '../constants';

const initialState = {
  favoritesList: [],
  loadingFavoritesList: true,
};

const favoritesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_FAVORITES_LIST:
      return {
        ...state,
        favoritesList: payload,
      };
    case constant.LOADING_FAVORITES_LIST:
      return {
        ...state,
        loadingFavoritesList: payload,
      };
    default:
      return state;
  }
};

export default favoritesReducer;
