import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../../../styles/theme';

const {width, height} = Dimensions.get('screen');

const FontCard = ({isFontEnabled, onToggle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>DYSLEXIC FONT</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => onToggle(false)}>
          <View
            style={[
              styles.radioOuter,
              !isFontEnabled && styles.radioOuterSelected,
            ]}>
            {!isFontEnabled && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.optionText}>off</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => onToggle(true)}>
          <View
            style={[
              styles.radioOuter,
              isFontEnabled && styles.radioOuterSelected,
            ]}>
            {isFontEnabled && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.optionText}>on</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FontCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.034,
    borderWidth: 4,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
  },

  label: {
    fontSize: width * 0.06,
    fontFamily: theme.typography.MontserratfontFamilySemiBold,
    color: theme.colors.primary,
  },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.05,
  },

  radioOption: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: width * 0.02,
    top: height * 0.01,
  },

  radioOuter: {
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: width * 0.025,
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterSelected: {
    borderColor: theme.colors.primary,
  },

  radioInner: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: width * 0.015,
    backgroundColor: theme.colors.primary,
  },

  optionText: {
    fontSize: width * 0.035,
    fontFamily: theme.typography.MontserratfontFamilyBold,
    color: theme.colors.secondary,
    textTransform: 'uppercase',
  },
});
