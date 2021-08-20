import * as constant from '../constants';

const initialState = {
  isShowSearchIcon: true,
  isClearSearchInputText: false,
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
    default:
      return state;
  }
};

export default searchReducer;
