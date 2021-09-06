import * as constant from '../constants';
import { onDs } from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const updateFavoritesList = (payload) => ({
  type: constant.GET_FAVORITES_LIST,
  payload,
});

const getFavoritesLinkFromStorage = async () => {
  const data = await AsyncStorage.getItem('@favorites');

  return !data ? [] : JSON.parse(data);
};

export const getFavoritesList = () => {
  const loading = constant.LOADING_FAVORITES_LIST;

  return async (dispatch) => {
    dispatch(onDs(loading, true));
    try {
      const data = await getFavoritesLinkFromStorage();

      dispatch(updateFavoritesList(data));
    } finally {
      dispatch(onDs(loading, false));
    }
  };
};

export const addToFavoriteList = (item) => {
  return async (dispatch) => {
    const data = await getFavoritesLinkFromStorage();

    const list = [...data, item];

    await AsyncStorage.setItem('@favorites', JSON.stringify(list));
    dispatch(updateFavoritesList(list));
  };
};

export const deleteFromFavoritesList = (id) => {
  return async (dispatch) => {
    const data = await getFavoritesLinkFromStorage();

    const list = data.filter((el) => el.id !== id);

    await AsyncStorage.setItem('@favorites', JSON.stringify(list));
    dispatch(updateFavoritesList(list));
  };
};
