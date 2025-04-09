import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  Text,
  Image,
} from 'react-native';
import { theme } from '../../styles/theme';
import { globalStyles } from '../../styles/globalStyles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SecondaryHeader from '../../utils/customComponents/customHeaders/SecondaryHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../utils/customComponents/customInputField/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../redux/slices/eventSlice';

const { width, height } = Dimensions.get('screen');

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const notifications = useSelector(state => state.events.events);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllEvents());
    }, [dispatch])
  );

  const sortedNotifications = (notifications || [])
    .sort((a, b) => new Date(a.date) - new Date(b.date)) 
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const isUpcomingEvent = (date) => {
    return new Date(date) >= new Date();
  };

  const renderNotification = ({ item }) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>

      <View style={styles.cardContent}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}  
            style={styles.cardImage}
          />
        ) : (
          <Image
            source={{
              uri: 'https://worldbusinessoutlook.com/wp-content/uploads/2023/06/Tech-Summit-23.jpg', // fallback image
            }}
            style={styles.cardImage}
          />
        )}


        <View style={styles.detailsContainer}>
          <Text style={[styles.cardDate, isUpcomingEvent(item.date) ? styles.upcomingEvent : styles.pastEvent]}>
            {new Date(item.date).toDateString()}
          </Text>
          <Text style={styles.cardMessage}>{item.details}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.container, styles.primaryContainer]}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          headerTitle="NOTIFICATIONS"
          headerSubtitle="Stay Updated, Stay Informed!"
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
            placeholder="Search Notifications"
            placeholderTextColor={theme.colors.primary}
            backgroundColor={theme.colors.white}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.secondaryContainer}>
        <FlatList
          data={sortedNotifications}
          renderItem={renderNotification}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{ paddingBottom: height * 0.02 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

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
    transform: [{ translateY: width * 0.12 }],
    zIndex: 8,
  },

  cardContainer: {
    backgroundColor: theme.colors.white,
    padding: width * 0.04,
    marginBottom: width * 0.05,
    borderRadius: 12,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: width * 0.02,
  },

  cardImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    marginRight: width * 0.04,
  },

  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },

  detailsContainer: {
    flex: 1,
  },

  cardDate: {
    fontSize: width * 0.04,
    marginBottom: 4,
  },

  upcomingEvent: {
    color: 'green', 
  },

  pastEvent: {
    color: 'gray',
  },

  cardMessage: {
    fontSize: width * 0.04,
    color: theme.colors.lightDark,
    flexShrink: 1,
  },
});
