import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {theme} from '../../../styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Icon library

const {width, height} = Dimensions.get('screen');

const VideoCard = ({title, videoUrl, description, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[globalStyles.container, styles.primaryContainer]}>
      <LinearGradient
        colors={['#A56E41', '#D3915C']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.descriptionContainer}>
        <View style={styles.topContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: videoUrl
                  ? 'https://th.bing.com/th/id/OIP.EHrzycF6yqnrEUi5KhSwaAHaEo?rs=1&pid=ImgDetMain'
                  : 'https://th.bing.com/th/id/OIP.EHrzycF6yqnrEUi5KhSwaAHaEo?rs=1&pid=ImgDetMain', // Dummy image URL
              }}
              style={styles.dummyImage}
            />
            {videoUrl && (
              <View style={styles.playButtonContainer}>
                <Ionicons
                  name="play-circle"
                  size={width * 0.08}
                  color={theme.colors.black}
                  style={styles.playButton}
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/placeHolder/default_avatar.png')}
              style={styles.placeholderImage}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  primaryContainer: {
    padding: height * 0.02,
  },

  descriptionContainer: {
    padding: height * 0.02,
    borderRadius: theme.borderRadius.large,
    borderTopLeftRadius: 0,
    position: 'relative',
  },

  topContainer: {
    marginBottom: height * 0.02,
    marginTop: -height * 0.0168,
  },

  imgContainer: {
    position: 'relative',
  },

  dummyImage: {
    width: width * 0.906,
    height: height * 0.24,
    resizeMode: 'cover',
    right: width * 0.042,
    borderRadius: theme.borderRadius.large,
  },

  playButtonContainer: {
    position: 'absolute',
    top: width * 0.24,
    left: width * 0.4,
    transform: [{translateX: -25}, {translateY: -25}],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.circle,
    backgroundColor: 'rgba(255, 247, 247, 0.7)',
    padding: height * 0.02,
  },

  playButton: {
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    marginLeft: width * 0.04,
    paddingRight: width * 0.02,
  },

  title: {
    fontSize: width * 0.04,
    fontFamily: theme.typography.MontserratfontFamilyRegular,
    color: theme.colors.white,
    marginBottom: height * 0.01,
  },

  description: {
    fontSize: width * 0.036,
    fontFamily: theme.typography.MontserratfontFamilyRegular,
    color: theme.colors.white,
    marginBottom: height * 0.01,
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderImage: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: (width * 0.3) / 2,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
});
