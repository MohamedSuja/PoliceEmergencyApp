import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from './AuthProvider';
import AppStack from './Stacks/AppStack';
import AuthStack from './Stacks/AuthStack';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';

const Routes = () => {
  const [initializing, setInitializing] = useState(true);
  const {user, setUser} = useContext(AuthContext);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing)
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text>fgffg</Text>
      </View>
    );

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
