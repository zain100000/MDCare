import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('📲 Notification permission granted.');
    await getAndStoreFcmToken();
  } else {
    console.log('🚫 Notification permission denied.');
  }
};

export const getAndStoreFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
      console.log('✅ FCM Token stored:', fcmToken);
    } else {
      console.log('❌ Failed to get FCM token');
    }
  } catch (err) {
    console.error('FCM Token Error:', err);
  }
};

export const subscribeToTokenRefresh = (onTokenRefreshCallback) => {
  return messaging().onTokenRefresh(async (newToken) => {
    await AsyncStorage.setItem('fcmToken', newToken);
    console.log('🔁 Token refreshed and saved:', newToken);
    if (onTokenRefreshCallback) onTokenRefreshCallback(newToken);
  });
};
