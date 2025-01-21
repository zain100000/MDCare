import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../../../styles/theme';

const {width, height} = Dimensions.get('screen');

const HomeHeader = ({imageSource, headerTitle, headerSubtitle, onPress}) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <Text style={[styles.headerTitleText, styles.headerTitle]}>
            {headerTitle}
          </Text>
          <Text style={[styles.headerSubtitleText, styles.headerSubtitle]}>
            {headerSubtitle}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftContainer: {
    alignItems: 'flex-start',
    left: width * 0.04,
    marginTop: height * 0.04,
  },

  rightContainer: {
    alignItems: 'center',
    right: width * 0.04,
  },

  headerTitleText: {
    fontSize: width * 0.054,
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamilyMedium,
  },

  headerSubtitleText: {
    fontSize: width * 0.1,
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamilyMedium,
    textTransform: 'uppercase',
    letterSpacing: width * 0.01,
    marginTop: -height * 0.01,
  },

  image: {
    width: width * 0.2,
    height: height * 0.14,
    top: height * 0.02,
  },
});
