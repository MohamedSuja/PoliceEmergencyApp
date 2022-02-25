import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminHome from '../../screens/admin/AdminHome';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
    </Stack.Navigator>
  );
};

export default AdminStack;
