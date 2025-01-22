import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
} from 'react-native';
import {theme} from '../../../styles/theme';

const {width, height} = Dimensions.get('screen');

const Header = ({imageSource, headerTitle, headerSubtitle}) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerTitleText}>{headerTitle}</Text>
          <Text style={styles.headerSubtitleText}>{headerSubtitle}</Text>
        </View>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },

  textContainer: {
    alignItems: 'center',
  },

  headerTitleText: {
    fontSize: width * 0.08,
    color: theme.colors.primary,
    fontFamily: theme.typography.MontserratfontFamilyBold,
  },

  headerSubtitleText: {
    fontSize: width * 0.04,
    color: theme.colors.primary,
    fontFamily: theme.typography.MontserratfontFamilyMedium,

    textTransform: 'uppercase',
    letterSpacing: width * 0.01,
    marginTop: -height * 0.01,
  },

  image: {
    width: width * 0.6,
    height: height * 0.2,
    marginTop: height * 0.04,
  },
});
