import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import {theme} from '../../../styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const CustomCard = ({title, iconSource, gradientColors, onPress}) => {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [{scale}],
        },
      ]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.card}>
        <LinearGradient
          colors={
            gradientColors || [theme.colors.primary, theme.colors.secondary]
          }
          style={styles.gradientBackground}>
          <View style={styles.contentContainer}>
            <Text style={[styles.title, {color: theme.colors.white}]}>
              {title}
            </Text>
            {iconSource && <Image source={iconSource} style={styles.icon} />}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: height * 0.09,
    borderRadius: theme.borderRadius.large,
  },

  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing(1),
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
  },

  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.large,
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: theme.spacing(2),
  },

  title: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamilySemiBold,
  },

  icon: {
    width: width * 0.08,
    height: width * 0.08,
    marginLeft: theme.spacing(2),
  },
});
