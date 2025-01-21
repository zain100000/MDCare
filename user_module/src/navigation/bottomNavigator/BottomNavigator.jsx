import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/navigatorScreens/Home';
import Calendar from '../../screens/navigatorScreens/Calendar';
import Notification from '../../screens/navigatorScreens/Notification';
import Setting from '../../screens/navigatorScreens/Setting';
import {theme} from '../../styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('screen');

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: {
          height: height * 0.066,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={styles.tabBarBackground}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ' ',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: focused ? 'white' : 'transparent'},
              ]}>
              <Image
                source={require('../../assets/navigatorIcons/home.png')}
                style={{
                  width: width * 0.074,
                  height: width * 0.074,
                  tintColor: focused ? theme.colors.primary : theme.colors.gray,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: focused ? 'white' : 'transparent'},
              ]}>
              <Image
                source={require('../../assets/navigatorIcons/calendar.png')}
                style={{
                  width: width * 0.074,
                  height: width * 0.074,
                  tintColor: focused ? theme.colors.primary : theme.colors.gray,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: focused ? 'white' : 'transparent'},
              ]}>
              <Image
                source={require('../../assets/navigatorIcons/notification.png')}
                style={{
                  width: width * 0.074,
                  height: width * 0.074,
                  tintColor: focused ? theme.colors.primary : theme.colors.gray,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: focused ? 'white' : 'transparent'},
              ]}>
              <Image
                source={require('../../assets/navigatorIcons/setting.png')}
                style={{
                  width: width * 0.074,
                  height: width * 0.074,
                  tintColor: focused ? theme.colors.primary : theme.colors.gray,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: width * 0.035,
    fontFamily: theme.typography.fontFamilyMedium,
  },

  tabBarBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.09,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
  },

  iconContainer: {
    padding: width * 0.034,
    borderRadius: width * 0.04,
  },
});
