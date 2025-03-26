import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {theme} from '../../styles/theme';
import {globalStyles} from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import SecondaryHeader from '../../utils/customComponents/customHeaders/SecondaryHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../utils/customComponents/customInputField/InputField';
import EventCard from '../../utils/customComponents/customEventCard/EventCard';
import {useDispatch, useSelector} from 'react-redux';
import {getAllEvents} from '../../redux/slices/eventSlice';

const {width, height} = Dimensions.get('screen');

const Events = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const events = useSelector(state => state.events.events);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const filteredEvents = (events || []).filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderEvent = ({item}) => (
    <EventCard
      onPress={() =>
        navigation.navigate('EventDetail', {
          eventId: item._id,
          name: item.name,
          description: item.details,
          venue: item.venue,
          date: item.date,
          time: item.time,
          image:
            'https://th.bing.com/th/id/OIP.aEvPkBFdKytOiJj-gZV-CQHaEK?rs=1&pid=ImgDetMain',
        })
      }
      name={item.name}
      description={item.details}
      date={item.date}
      time={item.time}
      venue={item.venue}
      imageSource={{
        uri: 'https://th.bing.com/th/id/OIP.aEvPkBFdKytOiJj-gZV-CQHaEK?rs=1&pid=ImgDetMain',
      }}
    />
  );

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          headerTitle="EVENTS"
          headerSubtitle="Explore, Engaged, Empower!"
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
          data={filteredEvents}
          renderItem={renderEvent}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{paddingBottom: height * 0.02}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Events;

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
