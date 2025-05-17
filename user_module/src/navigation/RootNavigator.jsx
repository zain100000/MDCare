import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../redux/store/store';
import { navigationRef } from './NavigationService';
import {WebRTCProvider} from '../Provider/WebRTCProvider';
const RootNavigator = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <WebRTCProvider> 
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
        </WebRTCProvider> 
      </PersistGate>
    </Provider>
  );
};

export default RootNavigator;
