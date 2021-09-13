import * as constant from '../constants';

const initialState = {
  catalogLayout: 'row',
};

const catalogLayoutReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.SET_CATALOG_LAYOUT:
      return {
        ...state,
        catalogLayout: payload,
      };
    default:
      return state;
  }
};

export default catalogLayoutReducer;
