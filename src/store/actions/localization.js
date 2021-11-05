import * as constant from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onDs } from './utils';
import i18n from 'i18n-js';
import { onAlert } from '../../resources/utils';

export const switchAppLanguage = (lng) => {
  return async (dispatch) => {
    i18n.locale = lng;
    await AsyncStorage.setItem('@language', JSON.stringify(lng));
    dispatch(onDs(constant.SWITH_APP_LANGUAGE, lng));
  };
};

export const getAppLanguage = () => {
  return async (dispatch) => {
    const lng = JSON.parse(await AsyncStorage.getItem('@language')) || null;

    if (!lng) {
      i18n.locale = 'ru';
      return;
    }

    i18n.locale = lng;
    dispatch(switchAppLanguage(lng));
  };
};
