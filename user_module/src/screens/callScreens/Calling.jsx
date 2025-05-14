/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import IconButton from '../../utils/Components/IconButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useWebRTC } from '../../Provider/WebRTCProvider';
const Calling = ( ) => {
  const route = useRoute();
  const otherUserId = route?.params?.consultantId || '';

  console.log('Calling screen params:',otherUserId);
  const { setOtherUserId, processCall, leave } = useWebRTC();

  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect triggered with otherUserId:', otherUserId);  // Log to check if it's called
      if (otherUserId) {
        setOtherUserId(otherUserId); // Set the otherUserId
        processCall(otherUserId); // Start the call
      } else {
        console.error('No consultantId found.');
      }
    }, [otherUserId])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Calling...</Text>
      <View style={styles.myId}>
        <Text style={styles.idText}>{otherUserId}</Text>
      </View>
      <View style={styles.content}>
        <IconButton
          backgroundColor="red"
         onPress={() => leave(false, otherUserId)}
         // onPress={() => navigation.goBack()}
          IconComponent={
            <MaterialIcons name="call-end" size={22} color={'#ffffff'} />
          }
        />
      </View>
    </View>
  );
};

export default Calling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  idText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  myId: {
    backgroundColor: 'lightgrey',
    padding: 20,
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
});
