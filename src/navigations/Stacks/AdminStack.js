import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminHome from '../../screens/admin/AdminHome';
import AddPost from '../../screens/admin/AddPost';
import ShowComplaint from '../../screens/admin/ShowComplaint';
import AdminEmergency from '../../screens/admin/AdminEmergency';
import ViewComplaint from '../../screens/admin/ViewComplaint';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="ShowComplaint" component={ShowComplaint} />
      <Stack.Screen name="AdminEmergency" component={AdminEmergency} />
      <Stack.Screen name="ViewComplaint" component={ViewComplaint} />
    </Stack.Navigator>
  );
};

export default AdminStack;
