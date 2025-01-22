import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import logoutAnimation from '../../assets/animations/logout.json';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CustomModal from './CustomModal';
import {theme} from '../../styles/theme';
import {logoutUser} from '../../redux/slices/authSlice';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('screen');

const LogoutModal = ({visible, title, description, onClose}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    setShowAuthModal(true);

    try {
      const resultAction = await dispatch(logoutUser()).unwrap();

      if (resultAction.success) {
        setTimeout(() => {
          setShowAuthModal(false);
          setShowSuccessModal(true);

          setTimeout(() => {
            setShowSuccessModal(false);
            navigation.replace('Signin');
          }, 2000);
        }, 2000);
      } else {
        console.error(
          'Logout failed:',
          resultAction.message || 'Unknown error.',
        );
        setShowErrorModal(true);

        setTimeout(() => {
          setShowErrorModal(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setShowErrorModal(true);

      setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <LottieView
            source={logoutAnimation}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.modalText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>

          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={onClose}>
              <View style={styles.cancelContainer}>
                <View style={styles.icon}>
                  <Ionicons
                    name="close-circle"
                    size={25}
                    color={theme.colors.white}
                  />
                </View>
                <Text style={styles.cancelText}>Cancel</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
              <View style={styles.proceedContainer}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  {loading ? (
                    <ActivityIndicator size={25} color={theme.colors.white} />
                  ) : (
                    <>
                      <View style={styles.icon}>
                        <Ionicons
                          name="checkmark-circle"
                          size={25}
                          color={theme.colors.white}
                        />
                      </View>
                      <Text style={styles.proceedText}>Proceed</Text>
                    </>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <CustomModal
        visible={showAuthModal}
        title="Working!"
        description="Please wait while we logging out"
        animationSource={require('../../assets/animations/logout.json')}
        onClose={() => setShowAuthModal(false)}
      />

      <CustomModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        animationSource={require('../../assets/animations/success.json')}
        title="Logout Successful!"
        description="You have been logged out successfully."
      />

      <CustomModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        animationSource={require('../../assets/animations/error.json')}
        title="Logout Failed"
        description="There was an error during the logout."
      />
    </Modal>
  );
};

export default LogoutModal;

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
    height: height * 0.48,
  },

  animation: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 15,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: width * 0.05,
    color: theme.colors.dark,
    fontFamily: theme.typography.fontFamilyRegular,
  },

  descriptionText: {
    textAlign: 'center',
    color: theme.colors.secondary,
    fontFamily: theme.typography.fontFamilyRegular,
    fontSize: width * 0.04,
    marginBottom: 20,
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 30,
    width: '100%',
  },

  cancelContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.dark,
    borderRadius: 10,
    gap: 10,
    paddingVertical: height * 0.022,
    paddingHorizontal: height * 0.02,
    marginHorizontal: width * 0.003,
    width: width * 0.35,
  },

  proceedContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    gap: 10,
    paddingVertical: height * 0.022,
    paddingHorizontal: height * 0.02,
    marginHorizontal: width * 0.003,
    width: width * 0.35,
  },

  cancelText: {
    fontSize: width * 0.04,
    top: height * 0.0036,
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamilyRegular,
  },

  proceedText: {
    fontSize: width * 0.04,
    top: height * 0.0036,
    color: theme.colors.white,
    fontFamily: theme.typography.fontFamilyRegular,
  },

  icon: {
    top: height * 0.002,
  },
});