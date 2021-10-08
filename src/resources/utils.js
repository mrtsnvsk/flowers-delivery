import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';

export const onAlert = (text) => {
  Alert.alert('', text);
};

export const getOrderFromStorage = async () => {
  const orders = await AsyncStorage.getItem('@order');

  return orders ? JSON.parse(orders) : [];
};

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    return;
  }

  return await Location.getLastKnownPositionAsync();
};

export const allowLocation = async () => {
  await Location.requestForegroundPermissionsAsync();
};

export const getReverseGeocode = async (latitude, longitude) => {
  const [loc] = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  return Platform.OS === 'ios' ? loc.name : `${loc.street}, ${loc.name}`;
};
