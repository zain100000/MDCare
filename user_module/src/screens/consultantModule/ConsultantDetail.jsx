import React,{useCallback} from 'react';
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
import {useRoute} from '@react-navigation/native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import Button from '../../utils/customComponents/customButton/Button';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('screen');
const ConsultantDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  var {consultantId, image, name, bio, phone, expertise} = route.params || {};
console.log('Consultant Detail:', route.params);
  const handleContact = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    } else {
      // Handle case where phoneNumber is not available (e.g., show an error message)
      console.log('Phone number not available');
    }
  };


  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused. Params:', route.params);
      // You can perform other actions here if needed, like refreshing Redux, logging, etc.
    }, [route.params])
  );
  
  
  const senderId = useSelector(state => state.auth.user?.id);
  console.log('Redux senderId:', senderId);
  const handleChatNavigation = () => {
    navigation.navigate('ConsultantChat', {
      senderId,
      consultantId,
      consultantName: name,
      consultantImage: image,
    });
  };

  const handleCallStart = () => {
    if(consultantId === '678cc37573ad7bbaaaa324ae'){
      consultantId = '6824198463087cf025f234e9'
    }
    console.log('Starting call with consultantId:', consultantId);  
    navigation.navigate('Calling', {consultantId});
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
            <Text style={styles.description}>{bio}</Text>
          </View>

          <View style={styles.expertiseContainer}>
            <Text style={styles.heading}>Specialites Handling</Text>
            <Text style={styles.expertise}>{expertise}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <Button title="📍 Location" width={186} onPress={() => {}} />
              <Button title="📞 Contact" width={186} onPress={handleContact} />
            </View>
            <Text style={styles.orText}>or</Text>
            <Button title="Leave a message" onPress={handleChatNavigation} />
          </View>
          <View style={{width: '100%', alignItems: 'center',}}>
            <View style={{width: '95%', marginBottom: 10,}}>
              <Button
                title="📹 Call"
                width={'100%'}
                onPress={handleCallStart}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConsultantDetail;

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
    color: theme.colors.secondary,
  },

  description: {
    fontSize: width * 0.044,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    marginLeft: width * 0.04,
    color: theme.colors.secondary,
  },

  expertiseContainer: {
    gap: theme.gap(1),
  },

  expertise: {
    fontSize: width * 0.044,
    fontFamily: theme.typography.RobotofontFamilySemiBold,
    marginLeft: width * 0.04,
    color: theme.colors.secondary,
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
