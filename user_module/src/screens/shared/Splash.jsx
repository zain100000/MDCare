import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen');

const Splash = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const token = await AsyncStorage.getItem('authToken');
      console.log('Token Get', token);

      if (token) {
        navigation.replace('Main');
      } else {
        navigation.replace('OnBoard');
      }

      setLoading(false);
    };

    checkSession();
  }, [navigation]);

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.secondaryContainer}>
        <View style={styles.imgContainer}>
          <Animatable.Image
            source={require('../../assets/splashScreen/splash_logo.png')}
            animation={'fadeIn'}
            duration={1500}
            style={styles.Img}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  primaryContainer: {
    backgroundColor: theme.colors.white,
  },

  secondaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  Img: {
    width: width * 0.46,
    height: width * 0.42,
  },
});
