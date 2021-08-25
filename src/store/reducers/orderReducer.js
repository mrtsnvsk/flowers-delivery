import * as constant from '../constants';

const initialState = {
  orderList: [],
  orderListCount: 0,
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.SET_ORDER_LIST:
      return {
        ...state,
        orderList: payload,
        orderListCount: payload.length,
      };
    default:
      return state;
  }
};

export default orderReducer;
