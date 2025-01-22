import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import Header from '../../utils/customComponents/customHeaders/Header';
import {theme} from '../../styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../utils/customComponents/customInputField/InputField';
import Button from '../../utils/customComponents/customButton/Button';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  isValidInput,
} from '../../utils/customValidations/Validations';

import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../redux/slices/authSlice';
import CustomModal from '../../utils/customModals/CustomModal';

const {width, height} = Dimensions.get('screen');

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(false);
  const [hidePassword1, setHidePassword1] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setCofirmPasswordError] = useState('');

  useEffect(() => {
    const hasErrors =
      nameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      setIsButtonEnabled(!hasErrors);
  }, [nameError, emailError, passwordError, confirmPasswordError]);

  const handleNameChange = value => {
    setName(value);
    setNameError(validateName(value));
  };

  const handleEmailChange = value => {
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = value => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);
    setCofirmPasswordError(validateConfirmPassword(value, password));
  };

  const handleRegister = async () => {
    if (isValidInput(name, email, password, confirmPassword)) {
      setLoading(true);

      const userData = {
        fullname: name,
        email,
        password,
        confirmPassword,
      };

      try {
        const resultAction = await dispatch(registerUser(userData));

        if (
          registerUser.fulfilled.match(resultAction) &&
          resultAction.payload.success
        ) {
          const {user} = resultAction.payload;
          console.log('USERSSSS', user);

          setShowSuccessModal(true);

          setTimeout(() => {
            setShowSuccessModal(false);
            navigation.navigate('Signin');
          }, 3000);
        } else {
          const errorMessage =
            registerUser.rejected.match(resultAction) && resultAction.payload
              ? resultAction.payload.message ||
                'An error occurred. Please try again.'
              : 'Unexpected response from server.';

          setLoading(false);
          console.error('Error:', errorMessage);
        }
      } catch (err) {
        console.error('Unexpected Error:', err);
        alert('An unexpected error occurred. Please try again.');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContainer}>
          <Header
            imageSource={require('../../assets/auth/signup_img.png')}
            headerTitle="SIGN UP"
            headerSubtitle="Create Your New Account"
          />
        </View>

        <View style={[styles.secondaryContainer]}>
          <View style={styles.formContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}>
              <View style={styles.nameContainer}>
                <Text style={[globalStyles.inputLabel]}>Name</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'person'}
                    size={width * 0.05}
                    color={theme.colors.primary}
                  />
                </View>
                <InputField
                  value={name}
                  onChangeText={handleNameChange}
                  placeholder="Enter Name"
                  placeholderTextColor={theme.colors.primary}
                  backgroundColor={theme.colors.white}
                />
                {nameError ? (
                  <Text style={[globalStyles.textError, styles.errorText]}>
                    {nameError}
                  </Text>
                ) : null}
              </View>

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

              <View style={styles.passwordContainer}>
                <Text style={[globalStyles.inputLabel]}>Password</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'lock-closed'}
                    size={width * 0.05}
                    color={theme.colors.primary}
                  />
                </View>
                <InputField
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder="Enter Password"
                  placeholderTextColor={theme.colors.primary}
                  backgroundColor={theme.colors.white}
                  secureTextEntry={hidePassword}
                />
                <TouchableOpacity
                  style={styles.eyeIconContainer}
                  onPress={() => setHidePassword(!hidePassword)}>
                  <Ionicons
                    name={hidePassword ? 'eye-off' : 'eye'}
                    size={width * 0.06}
                    color={theme.colors.white}
                  />
                </TouchableOpacity>
                {passwordError ? (
                  <Text
                    style={[globalStyles.textError, styles.passwordErrorText]}>
                    {passwordError}
                  </Text>
                ) : null}
              </View>

              <View style={styles.confirmPasswordContainer}>
                <Text style={[globalStyles.inputLabel]}>Confirm Password</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'lock-closed'}
                    size={width * 0.05}
                    color={theme.colors.primary}
                  />
                </View>
                <InputField
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  placeholder="Enter Confirm Password"
                  placeholderTextColor={theme.colors.primary}
                  backgroundColor={theme.colors.white}
                  secureTextEntry={hidePassword1}
                />
                <TouchableOpacity
                  style={styles.eyeIconContainer}
                  onPress={() => setHidePassword1(!hidePassword1)}>
                  <Ionicons
                    name={hidePassword1 ? 'eye-off' : 'eye'}
                    size={width * 0.06}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
                {confirmPasswordError ? (
                  <Text
                    style={[globalStyles.textError, styles.passwordErrorText]}>
                    {confirmPasswordError}
                  </Text>
                ) : null}
              </View>

              <View style={styles.btnContainer}>
                <Button
                  title="Signup"
                  color={theme.colors.black}
                  loading={loading}
                  onPress={handleRegister}
                  disabled={!isButtonEnabled}
                />
              </View>

              <View style={styles.signinContainer}>
                <View style={styles.leftContainer}>
                  <Text style={[globalStyles.textBlack]}>
                    Already have an account?
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.rightContainer}
                  onPress={() => navigation.navigate('Signin')}>
                  <Text style={[globalStyles.textPrimary, styles.textPrimary]}>
                    Signin
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>

      <CustomModal
        visible={showSuccessModal}
        title="Register Successfully!"
        imageSource={require('../../assets/icons/success.png')}
        onClose={() => setShowSuccessModal(false)}
      />
    </SafeAreaView>
  );
};

export default Signup;

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

  nameContainer: {
    marginBottom: height * 0.02,
  },

  emailContainer: {
    marginBottom: height * 0.02,
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

  eyeIconContainer: {
    alignSelf: 'flex-end',
    right: width * 0.02,
    bottom: theme.spacing(6.64),
  },

  btnContainer: {
    marginTop: height * 0.04,
  },

  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.9,
    marginTop: height * 0.045,
    marginBottom: height * 0.02,
  },

  textPrimary: {
    fontFamily: theme.typography.RobotofontFamilyMedium,
    fontSize: width * 0.044,
  },

  errorText: {
    position: 'absolute',
    bottom: -height * 0.014,
    paddingHorizontal: width * 0.014,
    fontSize: width * 0.034,
    fontFamily: theme.typography.RobotofontFamilyRegular,
  },

  passwordErrorText: {
    position: 'absolute',
    bottom: height * 0.014,
    paddingHorizontal: width * 0.014,
    fontSize: width * 0.034,
    fontFamily: theme.typography.RobotofontFamilyRegular,
  },
});
