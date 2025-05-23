import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import SecondaryHeader from '../../utils/customComponents/customHeaders/SecondaryHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../utils/customComponents/customInputField/InputField';
import {useDispatch, useSelector} from 'react-redux';
import {getSchool} from '../../redux/slices/schoolSlice';
import SchoolCard from '../../utils/customComponents/customSchoolCard/SchoolCard';

const {width, height} = Dimensions.get('screen');

const School = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const schools = useSelector(state => state.schools.schools);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getSchool());
  }, [dispatch]);

  const filteredSchools = (schools || []).filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderSchool = ({item}) => (
    <SchoolCard
      onPress={() =>
        navigation.navigate('SchoolDetail', {
          schoolId: item._id,
          name: item.name, // Pass the name
          description: item.description, // Pass the description
          specialties: item.specialties,
          phone: item.phone,
          image:
            'https://th.bing.com/th/id/OIP.aEvPkBFdKytOiJj-gZV-CQHaEK?rs=1&pid=ImgDetMain', // Static image for now
        })
      }
      name={item.name}
      description={item.description}
      imageSource={{
        uri: 'https://th.bing.com/th/id/OIP.aEvPkBFdKytOiJj-gZV-CQHaEK?rs=1&pid=ImgDetMain',
      }}
    />
  );

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          headerTitle="FIND A SCHOOL"
          headerSubtitle="Find your perfect school"
          titleColor="#07BBC6"
          subtitleColor="#035B60"
        />

        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={'search'}
              size={width * 0.05}
              color={theme.colors.primary}
            />
          </View>
          <InputField
            placeholder="Search"
            placeholderTextColor={theme.colors.primary}
            backgroundColor={theme.colors.white}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.secondaryContainer}>
        <FlatList
          data={filteredSchools}
          renderItem={renderSchool}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{paddingBottom: height * 0.02}}
        />
      </View>
    </SafeAreaView>
  );
};

export default School;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  secondaryContainer: {
    flex: 1,
    marginTop: height * 0.01,
  },

  searchContainer: {
    paddingHorizontal: width * 0.024,
    paddingVertical: height * 0.02,
  },

  iconContainer: {
    position: 'absolute',
    left: width * 0.04,
    transform: [{translateY: width * 0.12}],
    zIndex: 8,
  },
});
