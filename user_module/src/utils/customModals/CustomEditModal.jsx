import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../../styles/theme';

const {width, height} = Dimensions.get('screen');

const CustomEditModal = ({visible, onClose, onUpload, onCamera}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onUpload}>
              <LinearGradient
                colors={['#07BBC6', '#035B60']}
                style={styles.button}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}>
                <View style={styles.buttonTextContainer}>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={24}
                    color="white"
                  />
                  <Text style={styles.buttonText}> Upload from device</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity onPress={onCamera}>
              <LinearGradient
                colors={['#07BBC6', '#035B60']}
                style={styles.button}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}>
                <View style={styles.buttonTextContainer}>
                  <Ionicons name="camera-outline" size={24} color="white" />
                  <Text style={styles.buttonText}> Open camera</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomEditModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  modalView: {
    margin: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: theme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.92,
    height: height * 0.3,
  },

  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  button: {
    borderRadius: theme.borderRadius.large,
    paddingVertical: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
  },

  buttonTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: width * 0.04,
  },

  orText: {
    marginVertical: 10,
    fontSize: width * 0.04,
  },
});
