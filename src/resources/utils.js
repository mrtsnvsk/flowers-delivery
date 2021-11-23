import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Alert, Platform, Share } from 'react-native';
import * as Notifications from 'expo-notifications';
import ASDK from 'rn-asdk-tinkoff';

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

export const getDayAndMonth = (date) => {
  const day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getHoursAndMinutes = (time) => {
  const hours = time.getHours();
  let minutes = String(time.getMinutes());

  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }

  return `${hours}:${minutes}`;
};
// TINKOFF
const Tinkoff = new ASDK({
  terminal: '1612868226749DEMO',
  password: 'gw65jocdufobn1tj',
  publicKey:
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv5yse9ka3ZQE0feuGtemYv3IqOlLck8zHUM7lTr0za6lXTszRSXfUO7jMb+L5C7e2QNFs+7sIX2OQJ6a+HG8kr+jwJ4tS3cVsWtd9NXpsU40PE4MeNr5RqiNXjcDxA+L4OsEm/BlyFOEOh2epGyYUd5/iO3OiQFRNicomT2saQYAeqIwuELPs1XpLk9HLx5qPbm8fRrQhjeUD5TLO8b+4yCnObe8vy/BMUwBfq+ieWADIjwWCMp2KTpMGLz48qnaD9kdrYJ0iyHqzb2mkDhdIzkim24A3lWoYitJCBrrB2xM05sm9+OdCI1f7nPNJbl5URHobSwR94IRGT7CJcUjvwIDAQAB',
});

export const onlinePaymentTinkoff = async ({
  orderId,
  amount,
  title,
  description,
}) => {
  const result = await Tinkoff.payWithCard({
    amount,
    orderId,
    title,
    description,
  });

  onAlert(JSON.stringify(result));
};
