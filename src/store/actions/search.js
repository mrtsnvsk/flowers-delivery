import * as constant from '../constants';
import { onDs } from './utils';

export const setShowSearchIcon = (show) => {
  return onDs(constant.SET_SHOW_SEARCH_ICON, show);
};

export const clearSearchInputText = () => {
  return (dispatch) => {
    dispatch(onDs(constant.CLEAR_SEARCH_INPUT_TEXT, true));

    setTimeout(
      () => dispatch(onDs(constant.CLEAR_SEARCH_INPUT_TEXT, false)),
      1000
    );
  };
};

export const setOrderingAddressTerm = (address) => ({
  type: constant.SET_ORDERING_ADDRESS_TERM,
  payload: address,
});
