import * as constant from '../constants';

const initialState = {
  isShowSearchIcon: true,
  isClearSearchInputText: false,
  isOrderingAddressTerm: '',
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.SET_SHOW_SEARCH_ICON:
      return {
        ...state,
        isShowSearchIcon: payload,
      };
    case constant.CLEAR_SEARCH_INPUT_TEXT:
      return {
        ...state,
        isClearSearchInputText: payload,
      };
    case constant.SET_ORDERING_ADDRESS_TERM:
      return {
        ...state,
        isOrderingAddressTerm: payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
