import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {theme} from '../../../styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const SchoolCard = ({name, description, imageSource, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[globalStyles.container, styles.primaryContainer]}>
      <LinearGradient
        colors={['#07BBC6', '#035B60']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.contentContainer}>
        <View style={styles.imgContainer}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SchoolCard;

const styles = StyleSheet.create({
  primaryContainer: {
    padding: height * 0.01,
    width: width * 1,
  },

  contentContainer: {
    flexDirection: 'row',
    borderRadius: theme.borderRadius.large,
    borderTopLeftRadius: 0,
    position: 'relative',
  },

  imgContainer: {
    width: width * 0.3,
    height: width * 0.3,
  },

  image: {
    width: width * 0.24,
    height: height * 0.14,
    resizeMode: 'cover',
    borderTopLeftRadius: theme.borderRadius.large,
  },

  textContainer: {
    flex: 1,
    marginTop: height * 0.02,
  },

  name: {
    fontSize: width * 0.044,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
  },

  description: {
    fontSize: width * 0.036,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
  },
});
