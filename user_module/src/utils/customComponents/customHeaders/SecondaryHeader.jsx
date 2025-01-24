import React from 'react';
import {Text, StyleSheet, Dimensions, SafeAreaView, View} from 'react-native';
import {theme} from '../../../styles/theme';

const {width, height} = Dimensions.get('screen');

const SecondaryHeader = ({
  headerTitle,
  headerSubtitle,
  titleColor,
  subtitleColor,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.headerTitleText, {color: titleColor}]}>
            {headerTitle}
          </Text>
          <Text style={[styles.headerSubtitleText, {color: subtitleColor}]}>
            {headerSubtitle}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
    gap: theme.gap(0.2),
  },

  headerTitleText: {
    fontSize: width * 0.08,
    fontFamily: theme.typography.MontserratfontFamilyBold,
    textAlign: 'center',
  },

  headerSubtitleText: {
    fontSize: width * 0.034,
    fontFamily: theme.typography.MontserratfontFamilySemiBold,
    textTransform: 'uppercase',
    letterSpacing: width * 0.01,
    textAlign: 'center',
  },
});
