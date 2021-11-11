import * as constant from '../constants';
import { getPromosListReq } from '../../api/promos';
import { onDs } from './utils';

export const getPromosList = () => {
  return async (dispatch) => {
    const { data } = await getPromosListReq();

    dispatch(
      onDs(
        constant.GET_PROMOS_LIST,
        data.filter((el) => el.active === 1)
      )
    );
  };
};
