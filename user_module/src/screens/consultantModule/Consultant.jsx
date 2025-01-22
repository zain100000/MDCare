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
import {getWaitinglistConsultant} from '../../redux/slices/waitinglistConsultantSlice';
import ConsultantCard from '../../utils/customComponents/customConsultantCard/ConsultantCard';

const {width, height} = Dimensions.get('screen');

const Consultant = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const consultants = useSelector(
    state => state.waitinglistconsultant.waitinglist,
  );

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getWaitinglistConsultant());
  }, [dispatch]);

  useEffect(() => {
    console.log('Fetched Consultants:', consultants);
  }, [consultants]);

  const filteredConsultants = (consultants || []).filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderConsultant = ({item}) => (
    <ConsultantCard
      name={item.name}
      bio={item.bio}
      imageSource={{
        uri: 'https://th.bing.com/th/id/OIP.NdNKlT8S-vF-Z7UJLhI2JwHaE8?rs=1&pid=ImgDetMain',
      }}
    />
  );

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          headerTitle="FIND A CONSULTANT"
          headerSubtitle="Find your perfect consultant"
          titleColor="#07BBC6"
          subtitleColor="#035B60"
        />

        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={'search'}
              size={width * 0.05}
              color={theme.colors.white}
            />
          </View>
          <InputField
            placeholder="Search"
            placeholderTextColor={theme.colors.white}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.secondaryContainer}>
        <FlatList
          data={filteredConsultants}
          renderItem={renderConsultant}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{paddingBottom: height * 0.02}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Consultant;

const styles = StyleSheet.create({
  primaryContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  secondaryContainer: {
    flex: 1,
    marginTop: height * 0.04,
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