import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminHome from '../../screens/admin/AdminHome';
import AddPost from '../../screens/admin/AddPost';
import ShowComplaint from '../../screens/admin/ShowComplaint';
import AdminEmergency from '../../screens/admin/AdminEmergency';
import ViewComplaint from '../../screens/admin/ViewComplaint';
import ShowUser from '../../screens/admin/ShowUser';
import ViewAllPosts from '../../screens/admin/ViewAllPosts';
import NewsView from '../../screens/user/NewsView';
import AddPoliceStation from '../../screens/admin/AddPoliceStation';
import PoliceStationMap from '../../screens/user/PoliceStationMap';
import FineList from '../../screens/admin/FineList';
import UserDetailsVerify from '../../screens/admin/UserDetailsVerify';
import Idview from '../../screens/admin/Idview';

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
      <Stack.Screen name="ShowUser" component={ShowUser} />
      <Stack.Screen name="ViewAllPosts" component={ViewAllPosts} />
      <Stack.Screen name="NewsView" component={NewsView} />
      <Stack.Screen name="AddPoliceStation" component={AddPoliceStation} />
      <Stack.Screen name="PoliceStationMap" component={PoliceStationMap} />
      <Stack.Screen name="FineList" component={FineList} />
      <Stack.Screen name="UserDetailsVerify" component={UserDetailsVerify} />
      <Stack.Screen name="Idview" component={Idview} />
    </Stack.Navigator>
  );
};

export default AdminStack;
