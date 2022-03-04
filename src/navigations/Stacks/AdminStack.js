import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminHome from '../../screens/admin/AdminHome';
import AddPost from '../../screens/admin/AddPost';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AddPost"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="AddPost" component={AddPost} />
    </Stack.Navigator>
  );
};

export default AdminStack;
