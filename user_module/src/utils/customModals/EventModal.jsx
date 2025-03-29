import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';

const {width, height} = Dimensions.get('screen');

const EventModal = ({
  visible,
  onClose,
  event,
  primaryButtonText,
  onPrimaryButtonPress,
  secondaryButtonText,
  onSecondaryButtonPress,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Optional Image */}
          {event?.imageSource && (
            <Image
              source={event.imageSource}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          {/* Event Title */}
          <Text style={[globalStyles.textBlack, styles.modalTitle]}>
            🎉 {event?.name}
          </Text>

          {/* Event Details */}
          <Text style={styles.modalText}>📅 Date: {new Date(event?.date).toDateString()}</Text>
          <Text style={styles.modalText}>⏰ Time: {event?.time}</Text>
          <Text style={styles.modalText}>📍 Venue: {event?.venue}</Text>
          <Text style={styles.detailsText}>📝 {event?.details}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {primaryButtonText && (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={onPrimaryButtonPress}>
                <Text style={styles.primaryButtonText}>{primaryButtonText}</Text>
              </TouchableOpacity>
            )}
            {secondaryButtonText && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={onSecondaryButtonPress}>
                <Text style={styles.secondaryButtonText}>{secondaryButtonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EventModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  modalView: {
    margin: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.92,
  },

  image: {
    width: width * 0.2,
    height: width * 0.2,
    marginBottom: 15,
  },

  modalTitle: {
    textAlign: 'center',
    fontSize: width * 0.05,
    color: theme.colors.primary,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    marginBottom: 10,
  },

  modalText: {
    fontSize: width * 0.04,
    color: theme.colors.dark,
    textAlign: 'left',
    width: '100%',
    marginBottom: 5,
  },

  detailsText: {
    fontSize: width * 0.035,
    color: theme.colors.lightDark,
    textAlign: 'left',
    width: '100%',
    marginBottom: 15,
  },

  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: theme.colors.white,
    fontSize: width * 0.04,
  },

  secondaryButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: theme.colors.white,
    fontSize: width * 0.04,
  },
});
