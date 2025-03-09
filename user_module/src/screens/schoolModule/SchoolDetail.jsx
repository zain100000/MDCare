import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import Button from '../../utils/customComponents/customButton/Button';

const {width, height} = Dimensions.get('screen');

const SchoolDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    schoolId,
    image,
    name,
    description,
    phone,
    specialties = [],
  } = route.params || {};

  const handleContact = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    } else {
      // Handle case where phoneNumber is not available (e.g., show an error message)
      console.log('Phone number not available');
    }
  };

  const handleChatNavigation = () => {
    navigation.navigate('SchoolChat', {
      Id: schoolId,
      schoolName: name,
      schoolImage: image,
    });
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.image} />
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{name}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.heading}>Description</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <View style={styles.specialitiesContainer}>
            <Text style={styles.heading}>Specialites Handling</Text>
            {specialties.length > 0 ? (
              specialties.map((item, index) => (
                <Text key={index} style={styles.specialties}>
                  • {item}
                </Text>
              ))
            ) : (
              <Text style={styles.specialties}>No Specialties Found</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <Button title="📍 Location" width={186} onPress={() => {}} />
              <Button title="📞 Contact" width={186} onPress={handleContact} />
            </View>
            <Text style={styles.orText}>or</Text>
            <Button title="Leave a message" onPress={handleChatNavigation} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SchoolDetail;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  image: {
    width: '100%',
    height: width * 0.9,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  title: {
    fontSize: width * 0.07,
    fontFamily: theme.typography.MontserratfontFamilySemiBold,
    marginTop: height * 0.02,
    marginLeft: width * 0.04,
    color: theme.colors.secondary,
  },

  heading: {
    fontSize: width * 0.07,
    fontFamily: theme.typography.MontserratfontFamilySemiBold,
    marginTop: height * 0.02,
    marginLeft: width * 0.04,
    color: theme.colors.primary,
  },

  description: {
    fontSize: width * 0.044,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    marginLeft: width * 0.04,
    color: theme.colors.primary,
  },

  specialitiesContainer: {
    gap: theme.gap(1),
  },

  specialties: {
    fontSize: width * 0.044,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    marginLeft: width * 0.04,
    color: theme.colors.primary,
  },

  buttonContainer: {
    marginTop: height * 0.04,
    marginBottom: height * 0.01,
    paddingHorizontal: width * 0.02,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },

  orText: {
    textAlign: 'center',
    marginVertical: height * 0.02,
    fontSize: width * 0.054,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    color: theme.colors.black,
  },
});
