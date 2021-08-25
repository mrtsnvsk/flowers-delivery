import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOrderFromStorage = async () => {
  const orders = await AsyncStorage.getItem('@order');

  return orders ? JSON.parse(orders) : [];
};
