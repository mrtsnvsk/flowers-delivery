import * as constant from '../constants';
import { onDs } from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setLayout = async (value, dispatch) => {
  const type = constant.SET_CATALOG_LAYOUT;

  await AsyncStorage.setItem('@catalogLayout', JSON.stringify(value));

  dispatch(onDs(type, value));
};

export const getCatalogBlockLayout = () => {
  return async (dispatch) => {
    const catalogLayout = await AsyncStorage.getItem('@catalogLayout');

    if (!catalogLayout) {
      setCatalogBlockLayout(dispatch, 'row');
      return;
    }

    const layout = JSON.parse(catalogLayout);

    if (layout === 'list') {
      await setLayout('list', dispatch);
    } else if (layout === 'block') {
      await setLayout('block', dispatch);
    } else {
      await setLayout('row', dispatch);
    }
  };
};

export const setCatalogBlockLayout = (value) => {
  return async (dispatch) => {
    await setLayout(value, dispatch);
  };
};
