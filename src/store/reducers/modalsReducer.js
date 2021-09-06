import * as constant from '../constants';

const initialState = {
  isShowSortModal: false,
};

const modalsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.SHOW_SORT_MODAL:
      return {
        ...state,
        isShowSortModal: payload,
      };
    default:
      return state;
  }
};

export default modalsReducer;
