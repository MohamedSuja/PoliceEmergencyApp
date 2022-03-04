import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from './AuthProvider';
import AppStack from './Stacks/AppStack';
import AuthStack from './Stacks/AuthStack';
import auth from '@react-native-firebase/auth';
import {View, Text, ActivityIndicator} from 'react-native';
import OfficerStack from './Stacks/OfficerStack';
import AdminStack from './Stacks/AdminStack';

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
      <View style={{flex: 1, alignItems: 'center'}}>
        <ActivityIndicator size={'large'} style={{marginTop: 200}} />
      </View>
    );

  const Route = ({name}) => {
    if (name == 'officer') {
      return <OfficerStack />;
    } else if (name == 'admin') {
      return <AdminStack />;
    } else if (name == 'user') return <AppStack />;
    else {
      return <AuthStack />;
    }
  };

  return (
    <NavigationContainer>
      {user ? true ? <AdminStack /> : <AppStack /> : <AuthStack />}
      {/*  <Route name={'officer'} /> */}
    </NavigationContainer>
  );
};

export default Routes;
