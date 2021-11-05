import * as constant from '../constants';
import { onDs } from './utils';
import {
  getProductByIdReq,
  getProductsListReq,
  getSearchProductsListReq,
  getProductsWithStocksReq,
  getRecommendationsProductsReq,
} from '../../api/products';

export const updateCurrentProductCategory = (id) => ({
  type: constant.UPDATE_CURRENT_CATEGORY,
  payload: id,
});

export const getProductsList = (id, order) => {
  const loading = constant.LOADING_PRODUCTS_LIST;

  return async (dispatch, getState) => {
    dispatch(updateCurrentProductCategory(id));
    dispatch(onDs(loading, true));

    try {
      const f = getState().products.productPriceFrom,
        t = getState().products.productPriceTo;
      const { data } = await getProductsListReq(id, order, f, t);

      dispatch(onDs(constant.GET_PRODUCTS_LIST, data));
    } catch (e) {
      console.log('e', e);
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const getProductById = (id) => {
  const loading = constant.LOADING_PRODUCT_BY_ID;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const { data } = await getProductByIdReq(id);

      dispatch(onDs(constant.GET_PRODUCT_BY_ID, data));
    } catch (e) {
      // console.log('e', e.response);
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const updateProductById = () => ({
  type: constant.GET_PRODUCT_BY_ID,
  payload: null,
});

export const getSearchProductsList = (term) => {
  const loading = constant.LOADING_SEARCH_PRODUCTS_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const { data } = await getSearchProductsListReq(term);

      dispatch(onDs(constant.GET_SEARCH_PRODUCTS_LIST, data));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const updateSearchProductsTerm = (term) => ({
  type: constant.UPDATE_SEARCH_PRODUCTS_TERM,
  payload: term,
});

export const updateSortProductsOrder = (order) => ({
  type: constant.UPDATE_SORT_PRODUCTS_ORDER,
  payload: order,
});

export const updateProductsList = (payload) => ({
  type: constant.GET_PRODUCTS_LIST,
  payload,
});

export const getProductsWithStocks = () => {
  return async (dispatch) => {
    try {
      const {
        data: { products },
      } = await getProductsWithStocksReq();

      dispatch(onDs(constant.GET_PRODUCTS_WITH_STOCKS_LIST, products));
    } catch (e) {}
  };
};

export const setProductPriceDif = ({ from, to }) => ({
  type: constant.SET_PRODUCT_PRICE_DIF,
  payload: { from, to },
});

export const getRecommendationsProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await getRecommendationsProductsReq();

      dispatch(onDs(constant.GET_RECOMMEND_PRODUCTS_LIST, data));
    } finally {
    }
  };
};
