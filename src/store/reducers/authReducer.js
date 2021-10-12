import * as constant from '../constants';

const initialState = {
  isAuth: false,
  loadingIsAuth: true,
  isActivateApp: false,
  isSendedCode: null,
  userData: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constant.IS_SENDED_CODE:
      return {
        ...state,
        isSendedCode: payload.password,
        userData: payload.userData,
      };
    case constant.SET_AUTH_LOADING:
      return {
        ...state,
        loadingIsAuth: payload,
      };
    case constant.IS_AUTH_USER:
      return {
        ...state,
        isAuth: payload,
      };
    case constant.IS_ACTIVATE_APP:
      return {
        ...state,
        isActivateApp: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
