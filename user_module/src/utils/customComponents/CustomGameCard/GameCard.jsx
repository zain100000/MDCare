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

const GameCard = ({title, description, imageSource, onPress}) => {
  return (
    <TouchableOpacity
      style={[globalStyles.container, styles.primaryContainer]}
      activeOpacity={0.9}
      onPress={onPress}>
      <LinearGradient
        colors={['#D5664B', '#C15D43']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.contentContainer}>
        <View style={styles.imgContainer}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.playButton} onPress={onPress}>
            <Text style={styles.playText}>🎮 Play Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  primaryContainer: {
    padding: height * 0.015,
  },

  contentContainer: {
    flexDirection: 'row',
    padding: height * 0.02,
    borderRadius: theme.borderRadius.large,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
  },

  imgContainer: {
    marginRight: width * 0.04,
  },

  image: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: theme.borderRadius.medium,
    resizeMode: 'cover',
  },

  textContent: {
    flex: 1,
  },

  title: {
    fontSize: width * 0.045,
    fontFamily: theme.typography.fontFamilyBold,
    color: theme.colors.white,
    marginBottom: 6,
  },

  description: {
    fontSize: width * 0.035,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
    marginBottom: 10,
  },

  playButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: theme.borderRadius.medium,
    alignSelf: 'flex-start',
  },

  playText: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
