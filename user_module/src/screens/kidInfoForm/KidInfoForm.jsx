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

const {width, height} = Dimensions.get('screen');

const Signup = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [speciality, setSpeciality] = useState('');

  const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContainer}>
          <Header
            imageSource={require('../../assets/kidInfo/kid_info_img.png')}
            headerTitle="Info About Kid "
          />
        </View>

        <View style={[styles.secondaryContainer]}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.formContainer}>
              <View style={styles.nameContainer}>
                <Text style={[globalStyles.inputLabel]}>Name</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'person'}
                    size={width * 0.05}
                    color={theme.colors.white}
                  />
                </View>
                <InputField
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter Kid Name"
                  placeholderTextColor={theme.colors.white}
                />
              </View>

              <View style={styles.ageContainer}>
                <Text style={[globalStyles.inputLabel]}>Age</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'calendar'}
                    size={width * 0.05}
                    color={theme.colors.white}
                  />
                </View>
                <InputField
                  value={age}
                  onChangeText={setAge}
                  placeholder="Enter Kid Age"
                  placeholderTextColor={theme.colors.white}
                />
              </View>

              <View style={styles.genderContainer}>
                <Text style={[globalStyles.inputLabel]}>Gender</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'male'}
                    size={width * 0.05}
                    color={theme.colors.white}
                  />
                </View>
                <InputField
                  dropdownOptions={genderOptions}
                  selectedValue={gender}
                  onValueChange={setGender}
                  placeholder="Select Gender"
                />
              </View>

              <View style={styles.specialityContainer}>
                <Text style={[globalStyles.inputLabel]}>Speciality</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'trophy'}
                    size={width * 0.05}
                    color={theme.colors.white}
                  />
                </View>
                <InputField
                  value={speciality}
                  onChangeText={setSpeciality}
                  placeholder="Enter Kid Speciality"
                  placeholderTextColor={theme.colors.white}
                />
              </View>

              <View style={styles.btnContainer}>
                <Button
                  title="Add"
                  color={theme.colors.black}
                  //   loading={loading}
                  //   onPress={handleLogin}
                  //   disabled={!isButtonEnabled}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
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

  secondaryContainer: {
    flex: 2,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    padding: height * 0.014,
    marginTop: height * 0.04,
  },

  formContainer: {
    gap: theme.gap(2),
  },

  iconContainer: {
    position: 'absolute',
    left: width * 0.02,
    transform: [{translateY: width * 0.14}],
    zIndex: 8,
  },

  btnContainer: {
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
  },
});
