import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddFine from '../../screens/officer/AddFine';
import ShowEmergency from '../../screens/officer/ShowEmergency';
import OfficerBottomTab from '../OfficerBottomTab';
import AddEmergencyPost from '../../screens/officer/AddEmergencyPost';
import OfficerNewsFeed from '../../screens/officer/OfficerNewsFeed';
import NewsView from '../../screens/user/NewsView';

const Stack = createNativeStackNavigator();

const OfficerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OfficerBottomTab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OfficerBottomTab" component={OfficerBottomTab} />
      <Stack.Screen name="AddFine" component={AddFine} />
      <Stack.Screen name="ShowEmergency" component={ShowEmergency} />
      <Stack.Screen name="AddEmergencyPost" component={AddEmergencyPost} />
      <Stack.Screen name="OfficerNewsFeed" component={OfficerNewsFeed} />
      <Stack.Screen name="NewsView" component={NewsView} />
    </Stack.Navigator>
  );
};

export default OfficerStack;
