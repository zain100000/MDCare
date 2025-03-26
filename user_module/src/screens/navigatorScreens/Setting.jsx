import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {getUser} from '../../redux/slices/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import CustomModal from '../../utils/customModals/CustomModal';
import SecondaryHeader from '../../utils/customComponents/customHeaders/SecondaryHeader';
import Button from '../../utils/customComponents/customButton/Button';
import {logoutUser} from '../../redux/slices/authSlice';
import DarkModeCard from '../../utils/customComponents/customCards/DarkModeCard';
import FontCard from '../../utils/customComponents/customCards/FontCard';
import SwitchAccountCard from '../../utils/customComponents/customCards/SwitchAccountCard';

const {width, height} = Dimensions.get('screen');

const Setting = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [isFontEnabled, setIsFontEnabled] = useState(false); // Track font enable state
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getUser(user.id));
    }
  }, [dispatch, user]);

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
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.container,
        styles.primaryContainer,
        {
          backgroundColor: darkModeEnabled
            ? theme.colors.darkBackground
            : theme.colors.white,
        },
      ]}>
      <View style={styles.secondaryContainer}>
        <View style={styles.headerContainer}>
          <SecondaryHeader
            headerTitle="SETTINGS"
            headerSubtitle="Customize Your Experience"
            titleColor="#07BBC6"
            subtitleColor="#035B60"
          />
        </View>

        <View style={styles.cardContainer}>
          <DarkModeCard
            isDarkMode={darkModeEnabled}
            onToggle={toggleDarkMode}
          />

          <FontCard isFontEnabled={isFontEnabled} onToggle={setIsFontEnabled} />

          <SwitchAccountCard
            onPress={() => navigation.navigate('AccountSwitch')}
            accounts={[
              {
                id: 1,
                image: require('../../assets/placeHolder/default_avatar.png'),
              },
              {
                id: 2,
                image: require('../../assets/placeHolder/default_avatar.png'),
              },
              {id: 3, image: null}, // Will show default avatar
            ]}
            activeAccountId={1} // Currently active account
          />
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Logout"
            width={width * 0.4}
            loading={loading}
            onPress={handleLogout}
          />
        </View>
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

export default Setting;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
  },

  secondaryContainer: {
    flex: 1,
    padding: width * 0.02,
  },

  headerContainer: {
    marginBottom: height * 0.03,
  },

  cardContainer: {
    marginBottom: height * 0.03,
    gap: theme.gap(2),
  },

  btnContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: width * 0.04,
  },
});
