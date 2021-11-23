import * as constant from '../constants';
import { registerUserReq } from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { onDs } from './utils';
import { onAlert } from '../../resources/utils';
import { getAppLanguage } from './localization';

export const updateSmsCode = (password, userData) => ({
  type: constant.IS_SENDED_CODE,
  payload: { password, userData },
});

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(onDs(constant.IS_AUTH_USER, false));
    dispatch(onDs(constant.IS_SENDED_CODE, { password: null, userData: null }));
    await AsyncStorage.removeItem('@userData');
  };
};

export const setLoading = (payload) => ({
  type: constant.SET_AUTH_LOADING,
  payload,
});

export const registerUser = (phone) => {
  return async (dispatch) => {
    try {
      const {
        data: { user },
      } = await registerUserReq(phone);

      onAlert(user.password);

      dispatch(updateSmsCode(user.password, user));
    } catch (e) {
      dispatch(updateSmsCode(password, null));
    }
  };
};

export const authUser = (code) => {
  return async (dispatch, getState) => {
    const isSendedCode = getState().auth.isSendedCode;
    if (isSendedCode === code) {
      const userData = getState().auth.userData;

      await AsyncStorage.setItem('@userData', JSON.stringify(userData));

      dispatch(onDs(constant.IS_AUTH_USER, true));

      const pushToken =
        JSON.parse(await AsyncStorage.getItem('@pushToken')) || null;

      onAlert('Вы успешно авторизовались!');
    } else {
      dispatch(logoutUser());
      onAlert('Неверный пароль или номер телефона!');
    }
  };
};

export const checkAuthUser = () => {
  return async (dispatch) => {
    dispatch(getAppLanguage());
    try {
      const user = await AsyncStorage.getItem('@userData');
      if (user) {
        dispatch(onDs(constant.IS_AUTH_USER, true));
      } else {
        dispatch(logoutUser());
      }
    } finally {
      setTimeout(() => {
        dispatch(onDs(constant.SET_AUTH_LOADING, false));
      }, 3000);
    }
  };
};
