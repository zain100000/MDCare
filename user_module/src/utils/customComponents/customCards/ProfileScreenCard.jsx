import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '../../../styles/globalStyles';
import {theme} from '../../../styles/theme';

const {width, height} = Dimensions.get('screen');

const ProfileScreenCard = ({
  title,
  iconName,
  navigationTarget,
  rightIcon,
  iconColor,
  textColor,
  onPressFunction,
}) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const handlePress = () => {
    if (navigationTarget) {
      navigation.navigate(navigationTarget);
    } else if (onPressFunction) {
      onPressFunction();
    }
  };

  return (
    <View
      style={[
        globalStyles.card,
        {
          backgroundColor:
            colorScheme === 'dark'
              ? theme.colors.lightDark
              : theme.colors.white,
        },
      ]}>
      <View style={styles.cardContainer}>
        <View style={styles.cardLeftContainer}>
          <View style={styles.cardIconContainer}>
            <Ionicons
              name={iconName || 'cog-outline'}
              size={width * 0.064}
              style={[
                styles.cardIcon,
                {
                  color:
                    iconColor ||
                    (colorScheme === 'dark'
                      ? theme.colors.white
                      : theme.colors.primary),
                },
              ]}
            />
          </View>
          <View style={styles.cardTextContainer}>
            <Text
              style={[
                styles.cardTitle,
                {
                  color:
                    textColor ||
                    (colorScheme === 'dark'
                      ? theme.colors.white
                      : theme.colors.black),
                },
              ]}>
              {title || 'Default Title'}
            </Text>
          </View>
        </View>

        <View style={styles.cardRightContainer}>
          <View style={styles.cardIconContainer}>
            <TouchableOpacity onPress={handlePress}>
              <Ionicons
                name={rightIcon || 'chevron-forward'}
                size={30}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreenCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: height * 0.01,
  },

  cardLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: height * 0.01,
    gap: theme.gap(2),
  },

  cardIcon: {
    top: height * 0.003,
  },

  cardTitle: {
    fontSize: width * 0.04,
    fontFamily: theme.typography.fontFamilySemiBold,
    top: height * 0.002,
  },
});
