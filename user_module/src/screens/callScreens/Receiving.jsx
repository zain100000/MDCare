
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';
import IconButton from '../../utils/Components/IconButton';
import { useWebRTC } from '../../Provider/WebRTCProvider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Receiving = () => {
  const params = useRoute();
  const otherUserId = params.params.otherId;
  const { processAccept } = useWebRTC();

  console.log(params.params, 'params.params');

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Call from..</Text>
      <View style={styles.myId}>
        <Text style={styles.idText}>{otherUserId}</Text>
      </View>
      <View style={styles.content}>
        <IconButton
          backgroundColor="green"
          onPress={() => processAccept(otherUserId)}
          IconComponent={
            <MaterialIcons name="call" size={22} color="#ffffff" />
          }
        />
      </View>
    </View>
  );
};

export default Receiving;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  idText: {
    fontSize: 24,
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
