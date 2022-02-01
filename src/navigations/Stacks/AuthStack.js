import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import welcome from '../../screens/onboard/welcome';
import LoginAccount from '../../screens/auth/LoginAccount';
import CreateAccount from '../../screens/auth/CreateAccount';
import VerifyAccount from '../../screens/auth/VerifyAccount';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={welcome} />
      <Stack.Screen name="LoginAccount" component={LoginAccount} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
    </Stack.Navigator>
  );
};

export default AuthStack;
