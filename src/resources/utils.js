import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Alert, Platform, Share } from 'react-native';
import * as Notifications from 'expo-notifications';

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

export const getUserPhone = async () => {
  const user = await AsyncStorage.getItem('@userData');

  return JSON.parse(user).password;
};

// sharing
export const shareUrl = async (id) => {
  const url = `npx uri-scheme open exp://127.0.0.1:19000/--/product/${id} --ios`;

  await Share.share({
    message: url,
  });
};

export const getUserDataFromStorage = async () => {
  const user = JSON.parse(await AsyncStorage.getItem('@userData')) || null;

  return user;
};

export const sheduleNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

export const registerExpoPushTokens = async () => {
  try {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // alert(token);

    await AsyncStorage.setItem('@pushToken', JSON.stringify(token));

    return token || null;
  } catch {
    return null;
  }
};
