import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import Header from '../../utils/customComponents/customHeaders/Header';
import {theme} from '../../styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../utils/customComponents/customInputField/InputField';
import Button from '../../utils/customComponents/customButton/Button';
import {validateEmail} from '../../utils/customValidations/Validations';

const {width, height} = Dimensions.get('screen');

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const hasErrors = emailError || !email || setIsButtonEnabled(!hasErrors);
  }, [emailError]);

  const handleEmailChange = value => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContainer}>
          <Header
            imageSource={require('../../assets/auth/forgot_password_img.png')}
            headerTitle="FORGOT PASSWORD"
            headerSubtitle="Dont't Worry It Happens"
          />
        </View>

        <View style={[styles.secondaryContainer]}>
          <View style={styles.formContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}>
              <View style={styles.emailContainer}>
                <Text style={[globalStyles.inputLabel]}>Email</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'mail'}
                    size={width * 0.05}
                    color={theme.colors.primary}
                  />
                </View>
                <InputField
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="Enter Email"
                  placeholderTextColor={theme.colors.primary}
                  backgroundColor={theme.colors.white}
                />
                {emailError ? (
                  <Text style={[globalStyles.textError, styles.errorText]}>
                    {emailError}
                  </Text>
                ) : null}
              </View>

              <View style={styles.btnContainer}>
                <Button
                  title="Send Email"
                  color={theme.colors.black}
                  //   loading={loading}
                  //   onPress={handleLogin}
                  //   disabled={!isButtonEnabled}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  primaryContainer: {
    backgroundColor: theme.colors.white,
  },

  headerContainer: {
    flex: 1,
    marginTop: height * 0.02,
  },

  scrollViewContainer: {
    marginTop: height * 0.005,
  },

  secondaryContainer: {
    flex: 2,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    padding: height * 0.014,
    marginTop: height * 0.04,
  },

  iconContainer: {
    position: 'absolute',
    left: width * 0.02,
    transform: [{translateY: width * 0.134}],
    zIndex: 8,
  },

  btnContainer: {
    marginTop: height * 0.06,
  },

  errorText: {
    position: 'absolute',
    bottom: -height * 0.014,
    paddingHorizontal: width * 0.014,
    fontSize: width * 0.034,
    fontFamily: theme.typography.RobotofontFamilyRegular,
  },
});
