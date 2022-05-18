import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/user/Home';
import NewsFeed from '../../screens/user/NewsFeed';
import MakeComplaint from '../../screens/user/MakeComplaint';
import NewsView from '../../screens/user/NewsView';
import PayFine from '../../screens/user/PayFine';
import Emergency from '../../screens/user/Emergency';
import HomeBottomTab from '../HomeBottomTab';
import UserNotification from '../../screens/user/UserNotification';
import PoliceStationMap from '../../screens/user/PoliceStationMap';
import PaymentCard from '../../screens/user/PaymentCard';
import CharacterReports from '../../screens/CharacterReports';
import VerifyAccount from '../../screens/user/VerifyAccount';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeBottomTab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeBottomTab" component={HomeBottomTab} />
      <Stack.Screen name="NewsFeed" component={NewsFeed} />
      <Stack.Screen name="NewsView" component={NewsView} />
      <Stack.Screen name="MakeComplaint" component={MakeComplaint} />
      <Stack.Screen name="PayFine" component={PayFine} />
      <Stack.Screen name="Emergency" component={Emergency} />
      <Stack.Screen name="UserNotification" component={UserNotification} />
      <Stack.Screen name="PoliceStationMap" component={PoliceStationMap} />
      <Stack.Screen name="PaymentCard" component={PaymentCard} />
      <Stack.Screen name="CharacterReports" component={CharacterReports} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
    </Stack.Navigator>
  );
};

export default AppStack;
