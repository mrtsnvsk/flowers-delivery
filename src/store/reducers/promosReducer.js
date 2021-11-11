import * as constant from '../constants';

const initialState = {
  promosList: [],
};

const promosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.GET_PROMOS_LIST:
      return {
        ...state,
        promosList: payload,
      };
    default:
      return state;
  }
};

export default promosReducer;
