/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { io } from 'socket.io-client';
import EventModal from './src/utils/customModals/EventModal';
import { navigate } from './src/navigation/NavigationService';
import { requestUserPermission, subscribeToTokenRefresh } from './src/services/firebaseConfig';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventData, setEventData] = useState(null);

  const socket = io('http://10.0.2.2:8000', { transports: ['websocket'] });

  useEffect(() => {
    socket.on('newEvent', (event) => {
      setEventData(event);
      setModalVisible(true);
    });

    // Request permission & get token
    requestUserPermission();

    // Subscribe to token refresh and clean up on unmount
    const unsubscribeTokenRefresh = subscribeToTokenRefresh();
  
    return () => {
      socket.off('newEvent');
      unsubscribeTokenRefresh();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <RootNavigator />
      <EventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        event={eventData}
        primaryButtonText="OK"
        onPrimaryButtonPress={() => setModalVisible(false)}
        secondaryButtonText="View Event"
        onSecondaryButtonPress={() => {
          setModalVisible(false);
          navigate('Event');
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
