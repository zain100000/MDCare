import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {getUser} from '../../redux/slices/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import imgPlaceHolder from '../../assets/placeHolder/default_avatar.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../utils/customComponents/customInputField/InputField';
import ProfileScreenCard from '../../utils/customComponents/customCards/ProfileScreenCard';
import Geolocation from 'react-native-geolocation-service';
import {updateLocation, toggleTracking} from '../../redux/slices/locationSlice'; // Import toggleTracking
import {logoutUser} from '../../redux/slices/authSlice';

import LinearGradient from 'react-native-linear-gradient';
import CustomModal from '../../utils/customModals/CustomModal';

const {width, height} = Dimensions.get('screen');

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [photoURL, setPhotoURL] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.auth.user);

  const location = useSelector(state => state.location.location);
  const isTracking = useSelector(state => state.location.isTracking);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getUser(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user?.avatar) {
      setPhotoURL(user.avatar);
    } else {
      setPhotoURL('');
    }
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const resultAction = await dispatch(logoutUser()).unwrap();

      if (resultAction.success) {
        setTimeout(() => {
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
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTracker = async () => {
    if (!isTracking) {
      if (Platform.OS === 'ios') {
        // Only request authorization on iOS
        Geolocation.requestAuthorization('whenInUse').then(status => {
          if (status === 'granted') {
            getLocation();
          } else {
            Alert.alert('Permission Denied', 'Location access is required.');
          }
        });
      } else {
        // On Android, directly get the location
        getLocation();
      }
    } else {
      // Stop tracking and reset the location
      dispatch(toggleTracking()); // Dispatch the toggleTracking action to update state
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        // Dispatch updateLocation action to Redux
        dispatch(updateLocation({latitude, longitude}));
        dispatch(toggleTracking()); // Enable tracking after getting location
      },
      error => {
        Alert.alert('Error', 'Unable to fetch location.');
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.secondaryContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{user?.fullname}</Text>
          </View>

          <View style={styles.profileImageContainer}>
            <View style={styles.imgContainer}>
              {photoURL ? (
                <Image source={{uri: photoURL}} style={styles.image} />
              ) : (
                <Image source={imgPlaceHolder} style={styles.image} />
              )}
            </View>
          </View>

          <View style={styles.infoDetailContainer}>
            <TouchableOpacity style={styles.rightContainer} activeOpacity={0.9}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.secondary]}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={styles.linearGradient}>
                <Text style={styles.rightLabel}>Edit Profile</Text>
                <View style={styles.plusiconContainer}>
                  <Ionicons
                    name="add-circle"
                    size={width * 0.06}
                    color={theme.colors.white}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.labelContainer}>
              <Text style={[globalStyles.inputLabel, styles.label]}>
                Let us know you!
              </Text>
            </View>

            <View style={styles.phoneContainer}>
              <Text style={[globalStyles.inputLabel]}>Phone</Text>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={'call'}
                  size={width * 0.05}
                  color={theme.colors.primary}
                />
              </View>
              <InputField
                value={user?.phone}
                placeholder={'Phone'}
                placeholderTextColor={theme.colors.primary}
                backgroundColor={theme.colors.white}
                editable={false}
              />
            </View>

            <View style={styles.locationContainer}>
              <Text style={[globalStyles.inputLabel]}>Track Your Child</Text>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={'map'}
                  size={width * 0.05}
                  color={theme.colors.primary}
                />
              </View>
              <InputField
                value={location}
                placeholder={
                  typeof location === 'string'
                    ? location
                    : isTracking
                    ? 'Tracker Is On'
                    : 'Tracker Is Off'
                }
                placeholderTextColor={theme.colors.primary}
                editable={false}
                backgroundColor={theme.colors.white}
              />

              <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleTracker}>
                <Ionicons
                  name={isTracking ? 'toggle' : 'toggle-outline'}
                  size={24}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.childInfoContainer}>
            <View style={styles.labelContainer}>
              <Text style={[globalStyles.inputLabel, styles.label]}>
                Info about your child
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.plusIconContainer}
              onPress={() => navigation.navigate('Kid_Info_Form')}>
              <Ionicons
                name="add"
                size={width * 0.08}
                color={theme.colors.white}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.profileCards}>
            <View style={styles.logoutContainer}>
              <ProfileScreenCard
                title="Logout"
                iconName="log-out-outline"
                iconColor={theme.colors.primary}
                rightIcon="chevron-forward"
                onPressFunction={handleLogout}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <CustomModal
        visible={showSuccessModal}
        title="Logout Successfully!"
        imageSource={require('../../assets/icons/success.png')}
        onClose={() => setShowSuccessModal(false)}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  phoneContainer: {
    padding: height * 0.01,
  },

  locationContainer: {
    padding: height * 0.01,
  },

  iconContainer: {
    position: 'absolute',
    left: width * 0.04,
    transform: [{translateY: width * 0.16}],
    zIndex: 8,
  },

  toggleButton: {
    alignSelf: 'flex-end',
    right: width * 0.04,
    bottom: theme.spacing(6.64),
    zIndex: 4,
  },

  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.04,
  },

  image: {
    width: width * 0.45,
    height: width * 0.45,
    resizeMode: 'contain',
  },

  nameText: {
    fontSize: width * 0.14,
    fontFamily: theme.typography.fontFamilySemiBold,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: width * 0.01,
    textAlign: 'center',
    marginTop: height * 0.02,
  },

  label: {
    marginTop: height * 0.01,
    paddingHorizontal: width * 0.06,
    fontSize: width * 0.05,
    fontFamily: theme.typography.fontFamilySemiBold,
    color: theme.colors.secondary,
  },

  childInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  plusIconContainer: {
    right: width * 0.04,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
  },

  infoDetailContainer: {
    alignItems: 'center',
    marginLeft: width * 0.08,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },

  rightContainer: {
    marginRight: width * 0.04,
    borderRadius: theme.borderRadius.large,
  },

  linearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.02,
    borderRadius: theme.borderRadius.large,
  },

  rightLabel: {
    fontSize: width * 0.04,
    fontFamily: theme.typography.MontserratfontFamilySemiBold,
    color: theme.colors.white,
  },

  plusiconContainer: {
    left: width * 0.02,
    borderRadius: theme.borderRadius.large,
  },

  profileCards: {
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.04,
    gap: theme.gap(2.5),
  },
});
