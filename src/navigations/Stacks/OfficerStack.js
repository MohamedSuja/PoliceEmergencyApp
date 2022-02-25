import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OfficerHome from '../../screens/officer/OfficerHome';
import AddFine from '../../screens/officer/AddFine';

const Stack = createNativeStackNavigator();

const OfficerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OfficerHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OfficerHome" component={OfficerHome} />
      <Stack.Screen name="AddFine" component={AddFine} />
    </Stack.Navigator>
  );
};

export default OfficerStack;
