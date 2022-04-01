import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import OfficerProfile from '../screens/officer/OfficerProfile';
import OfficerSettings from '../screens/officer/OfficerSettings';
import OfficerHome from '../screens/officer/OfficerHome';
import UserProfile from '../screens/user/UserProfile';

const Tab = createMaterialBottomTabNavigator();

const OfficerBottomTab = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        sceneAnimationEnabled
        inactiveColor="rgba(255, 255, 255,0.7)"
        shifting>
        <Tab.Screen
          name="Home"
          component={OfficerHome}
          listeners={{
            tabPress: () =>
              SystemNavigationBar.setNavigationColor('#0a67fc', true),
          }}
          options={{
            tabBarColor: '#0a67fc',
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={UserProfile}
          listeners={{
            tabPress: () =>
              SystemNavigationBar.setNavigationColor('#7a004e', true),
          }}
          options={{
            tabBarColor: '#7a004e',
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={OfficerSettings}
          listeners={{
            tabPress: () =>
              SystemNavigationBar.setNavigationColor('#100061', true),
          }}
          options={{
            tabBarColor: '#100061',
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default OfficerBottomTab;
