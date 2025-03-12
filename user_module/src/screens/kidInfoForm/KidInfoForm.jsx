import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import Header from '../../utils/customComponents/customHeaders/Header';
import {theme} from '../../styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../utils/customComponents/customInputField/InputField';
import Button from '../../utils/customComponents/customButton/Button';
import {useDispatch} from 'react-redux';
import {addKid} from '../../redux/slices/kidSlice';
import CustomModal from '../../utils/customModals/CustomModal';

const {width, height} = Dimensions.get('screen');

const KidInfoForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];

  const handleAddKid = async () => {
    setLoading(true);

    const fields = {
      name,
      age,
      gender,
      speciality,
    };

    try {
      const resultAction = await dispatch(addKid(fields));

      if (addKid.fulfilled.match(resultAction)) {
        setShowSuccessModal(true);

        setTimeout(() => {
          setShowSuccessModal(false);
          navigation.replace('Main');
        }, 3000);
      } else {
        const errorMessage =
          addKid.rejected.match(resultAction) && resultAction.payload
            ? resultAction.payload.error || 'Failed to add kid.'
            : 'Unexpected response from server.';

        setLoading(false);
        console.error(errorMessage);
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
                    color={theme.colors.primary}
                  />
                </View>
                <InputField
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter Kid Name"
                  placeholderTextColor={theme.colors.primary}
                  backgroundColor={theme.colors.white}
                />
              </View>

              <View style={styles.ageContainer}>
                <Text style={[globalStyles.inputLabel]}>Age</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'calendar'}
                    size={width * 0.05}
                    color={theme.colors.primary}
                  />
                </View>
                <InputField
                  value={age}
                  onChangeText={setAge}
                  placeholder="Enter Kid Age"
                  placeholderTextColor={theme.colors.primary}
                  backgroundColor={theme.colors.white}
                />
              </View>

              <View style={styles.genderContainer}>
                <Text style={[globalStyles.inputLabel]}>Gender</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'male'}
                    size={width * 0.05}
                    color={theme.colors.primary}
                  />
                </View>
                <InputField
                  dropdownOptions={genderOptions}
                  selectedValue={gender}
                  onValueChange={setGender}
                  placeholder={'Select Gender'}
                  placeholderTextColor={theme.colors.primary}
                  backgroundColor={theme.colors.white}
                />
              </View>

              <View style={styles.specialityContainer}>
                <Text style={[globalStyles.inputLabel]}>Speciality</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={'trophy'}
                    size={width * 0.05}
                    color={theme.colors.primary}
                  />
                </View>
                <InputField
                  value={speciality}
                  onChangeText={setSpeciality}
                  placeholder="Enter Kid Speciality"
                  placeholderTextColor={theme.colors.primary}
                  backgroundColor={theme.colors.white}
                />
              </View>

              <View style={styles.btnContainer}>
                <Button
                  title="Add"
                  color={theme.colors.black}
                  loading={loading}
                  onPress={handleAddKid}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>

      <CustomModal
        visible={showSuccessModal}
        title="Kid Added Successfully!"
        imageSource={require('../../assets/icons/success.png')}
        onClose={() => setShowSuccessModal(false)}
      />
    </SafeAreaView>
  );
};

export default KidInfoForm;

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
    transform: [{translateY: width * 0.134}],
    zIndex: 8,
  },

  btnContainer: {
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
  },
});
