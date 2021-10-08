import * as constant from '../constants';
import { onDs } from './utils';
import { getCategoriesListReq } from '../../api/categories';

export const getCategoriesList = () => {
  const loading = constant.LOADING_CATEGORIES_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const { data } = await getCategoriesListReq();

      dispatch(onDs(constant.GET_CATEGORIES_LIST, data));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};
