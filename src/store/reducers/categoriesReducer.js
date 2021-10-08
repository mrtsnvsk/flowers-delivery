import * as constant from '../constants';

const initialState = {
  categoriesList: [],
  loadingCategoriesList: true,
  currentProductCategory: null,
};

const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_CATEGORIES_LIST:
      return {
        ...state,
        categoriesList: payload,
      };
    case constant.LOADING_CATEGORIES_LIST:
      return {
        ...state,
        loadingCategoriesList: payload,
      };
    case constant.UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentProductCategory: payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
