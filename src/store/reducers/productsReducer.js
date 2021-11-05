import * as constant from '../constants';

const initialState = {
  productsList: [],
  loadingProductsList: true,
  productById: null,
  loadingProductById: true,
  searchProductsList: [],
  loadingSearchProductsList: true,
  searchProductsTerm: '',
  orderSortProducts: null,
  productsWithStocksList: [],
  productPriceFrom: 0,
  productPriceTo: 99999,
  recommendProductsList: [],
};

const productsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_PRODUCTS_LIST:
      return {
        ...state,
        productsList: payload,
      };
    case constant.LOADING_PRODUCTS_LIST:
      return {
        ...state,
        loadingProductsList: payload,
      };
    case constant.GET_PRODUCT_BY_ID:
      return {
        ...state,
        productById: payload,
      };
    case constant.LOADING_PRODUCT_BY_ID:
      return {
        ...state,
        loadingProductById: payload,
      };
    case constant.GET_SEARCH_PRODUCTS_LIST:
      return {
        ...state,
        searchProductsList: payload,
      };
    case constant.LOADING_SEARCH_PRODUCTS_LIST:
      return {
        ...state,
        loadingSearchProductsList: payload,
      };
    case constant.UPDATE_SEARCH_PRODUCTS_TERM:
      return {
        ...state,
        searchProductsTerm: payload,
      };
    case constant.UPDATE_SORT_PRODUCTS_ORDER:
      return {
        ...state,
        orderSortProducts: payload,
      };
    case constant.GET_PRODUCTS_WITH_STOCKS_LIST:
      return {
        ...state,
        productsWithStocksList: payload,
      };
    case constant.SET_PRODUCT_PRICE_DIF:
      return {
        ...state,
        productPriceFrom: payload.from,
        productPriceTo: payload.to,
      };
    case constant.GET_RECOMMEND_PRODUCTS_LIST:
      return {
        ...state,
        recommendProductsList: payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
