import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Video from 'react-native-video'; // Import react-native-video
import {theme} from '../../../styles/theme';
import {globalStyles} from '../../../styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');

const VideoCard = ({title, videoUrl, description}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlayPress = () => {
    console.log('Play button pressed for:', videoUrl);
    setModalVisible(true);
  };

  const renderVideoContent = () => {
    if (videoUrl) {
      return (
        <Video
          source={{uri: videoUrl}}
          style={styles.videoPlayer}
          controls={true}
          resizeMode="contain"
          onError={error => console.log('Video error:', error)} // Debug errors
          onBuffer={buffer => console.log('Buffering:', buffer)} // Debug buffering
        />
      );
    }
  };

  return (
    <>
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
                  uri: 'https://th.bing.com/th/id/OIP.EHrzycF6yqnrEUi5KhSwaAHaEo?rs=1&pid=ImgDetMain',
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
                    onPress={handlePlayPress}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/placeHolder/img_placeholder.png')}
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

      {/* Modal for video */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {renderVideoContent()}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  primaryContainer: {
    padding: height * 0.02,
    paddingHorizontal: width * 0.02,
  },

  descriptionContainer: {
    padding: height * 0.01,
    borderRadius: theme.borderRadius.large,
    position: 'relative',
  },

  topContainer: {
    marginBottom: height * 0.02,
    marginTop: -height * 0.01,
  },

  imgContainer: {
    position: 'relative',
  },

  dummyImage: {
    width: width * 0.954,
    height: height * 0.24,
    resizeMode: 'cover',
    right: width * 0.018,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
  },

  playButtonContainer: {
    position: 'absolute',
    top: width * 0.24,
    left: width * 0.4,
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
    left: width * 0.024,
  },

  title: {
    fontSize: width * 0.04,
    fontFamily: theme.typography.RobotofontFamilyBold,
    color: theme.colors.white,
    marginBottom: height * 0.01,
  },

  description: {
    fontSize: width * 0.036,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    color: theme.colors.white,
    marginBottom: height * 0.01,
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderImage: {
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: (width * 0.3) / 2,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },

  videoPlayer: {
    width: '100%',
    height: height * 0.3, // Ensure the video fits within the modal
  },

  closeButton: {
    backgroundColor: '#A56E41',
    padding: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.large,
    marginTop: height * 0.02,
  },

  closeButtonText: {
    color: theme.colors.white,
    fontSize: width * 0.05,
    fontFamily: theme.typography.RobotofontFamilyBold,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    width: width * 0.9,
    height: height * 0.4,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
