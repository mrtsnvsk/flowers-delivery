import * as constant from '../constants';

const initialState = {
  language: 'ru',
};

const localizationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.SWITH_APP_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    default:
      return state;
  }
};

export default localizationReducer;
