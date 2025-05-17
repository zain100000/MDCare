/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './gesture-handler.native';
// ✅ Set background message handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('📩 Message handled in the background!', remoteMessage);
//     // You can trigger local notifications here using notifee or other libraries if needed
//   });
AppRegistry.registerComponent(appName, () => App);
