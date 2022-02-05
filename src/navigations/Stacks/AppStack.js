import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/user/Home';
import NewsFeed from '../../screens/user/NewsFeed';
import MakeComplaint from '../../screens/user/MakeComplaint';
import NewsView from '../../screens/user/NewsView';
import PayFine from '../../screens/user/PayFine';
import Emergency from '../../screens/user/Emergency';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewsFeed" component={NewsFeed} />
      <Stack.Screen name="NewsView" component={NewsView} />
      <Stack.Screen name="MakeComplaint" component={MakeComplaint} />
      <Stack.Screen name="PayFine" component={PayFine} />
      <Stack.Screen name="Emergency" component={Emergency} />
    </Stack.Navigator>
  );
};

export default AppStack;
