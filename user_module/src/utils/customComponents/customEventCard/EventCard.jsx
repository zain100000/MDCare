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
import Button from '../customButton/Button';

const {width, height} = Dimensions.get('screen');

const EventCard = ({
  name,
  description,
  imageSource,
  date,
  time,
  venue,
  onPress,
}) => {
  const formatDate = dateString => {
    if (!dateString) return '';
    try {
      const dateObj = new Date(dateString);
      return isNaN(dateObj)
        ? ''
        : dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
    } catch {
      return '';
    }
  };

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
          <Text style={styles.description}>{description}</Text>
          <View style={styles.bottomContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Date: {formatDate(date)}</Text>
              <Text style={styles.infoText}>Time: {time}</Text>
            </View>
            {venue && <Text style={styles.venueText}>Venue: {venue}</Text>}
          </View>
          <View style={{marginTop: 20}}>
            <Button title='Interested' />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  primaryContainer: {
    padding: height * 0.006,
    width: width * 1,
  },

  contentContainer: {
    flexDirection: 'row',
    borderRadius: theme.borderRadius.large,
    position: 'relative',
  },

  imgContainer: {
    width: width * 0.3,
    height: width * 0.3,
  },

  image: {
    width: width * 0.3,
    height: height * 0.28,
    resizeMode: 'cover',
    borderTopLeftRadius: theme.borderRadius.large,
    borderBottomLeftRadius: theme.borderRadius.large,
  },

  textContainer: {
    flex: 1,
    padding: width * 0.03,
  },

  name: {
    fontSize: width * 0.044,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
    marginBottom: height * 0.005,
  },

  description: {
    fontSize: width * 0.036,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
    marginBottom: height * 0.02,
  },

  bottomContainer: {
    flexDirection: 'column',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.005,
  },

  infoText: {
    fontSize: width * 0.036,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
  },

  venueText: {
    fontSize: width * 0.04,
    fontFamily: theme.typography.fontFamilyRegular,
    color: theme.colors.white,
  },
});
