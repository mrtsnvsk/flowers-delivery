import * as constant from '../constants';
import { onDs } from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPickupAddressesReq } from '../../api/order';

export const getOrderList = () => {
  return async (dispatch) => {
    const items = await AsyncStorage.getItem('@order');

    if (items) {
      dispatch(onDs(constant.SET_ORDER_LIST, JSON.parse(items)));
    }
  };
};

export const setOrderList = (orderList) => {
  return async (dispatch) => {
    await AsyncStorage.setItem('@order', JSON.stringify(orderList));

    dispatch(onDs(constant.SET_ORDER_LIST, orderList));
  };
};

export const changeOrderAddress = (address) => {
  return onDs(constant.CHANGE_ORDER_ADDRESS, address);
};

// delivery
export const getPickupAddresses = () => {
  return async (dispatch) => {
    const { data } = await getPickupAddressesReq();

    dispatch(onDs(constant.GET_ORDER_PICKUP_ADDRESSES, data));
  };
};
