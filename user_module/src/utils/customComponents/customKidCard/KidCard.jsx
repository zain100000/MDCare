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

const KidCard = ({name, age, gender, speciality, imageSource, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[globalStyles.container, styles.primaryContainer]}>
      <LinearGradient
        colors={['#035B60', '#07BBC6']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.contentContainer}>
        <View style={styles.imgContainer}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.age}>{age}</Text>
          <Text style={styles.gender}>{gender}</Text>
          <Text style={styles.speciality}>{speciality}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default KidCard;

const styles = StyleSheet.create({
  primaryContainer: {
    padding: height * 0.006,
  },

  contentContainer: {
    flexDirection: 'row',
    borderRadius: theme.borderRadius.large,
    position: 'relative',
  },

  imgContainer: {
    width: width * 0.2,
    height: width * 0.2,
  },

  image: {
    width: width * 0.2,
    height: height * 0.1,
    resizeMode: 'cover',
    borderTopLeftRadius: theme.borderRadius.large,
    borderBottomLeftRadius: theme.borderRadius.large,
  },

  textContainer: {
    flex: 1,
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
  },

  name: {
    fontSize: width * 0.044,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
  },

  age: {
    fontSize: width * 0.036,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
  },

  gender: {
    fontSize: width * 0.036,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
  },

  speciality: {
    fontSize: width * 0.036,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
  },
});
