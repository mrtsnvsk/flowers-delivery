import * as constant from '../constants';

const initialState = {
  orderList: [],
  orderListCount: 0,
  orderAddress: null,
  orderPickupAddresses: [],
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.SET_ORDER_LIST:
      return {
        ...state,
        orderList: payload,
        orderListCount: payload.length,
      };
    case constant.CHANGE_ORDER_ADDRESS:
      return {
        ...state,
        orderAddress: payload,
      };
    case constant.GET_ORDER_PICKUP_ADDRESSES:
      return {
        ...state,
        orderPickupAddresses: payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
