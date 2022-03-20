import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from './AuthProvider';
import AppStack from './Stacks/AppStack';
import AuthStack from './Stacks/AuthStack';
import auth from '@react-native-firebase/auth';
import {View, Text, ActivityIndicator} from 'react-native';
import OfficerStack from './Stacks/OfficerStack';
import AdminStack from './Stacks/AdminStack';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../components/LoadingModal';

const Routes = () => {
  const [initializing, setInitializing] = useState(true);
  const {user, setUser, password, email} = useContext(AuthContext);
  const [userType, setUserType] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    userChack(user);
    if (initializing) setInitializing(false);
  };

  const userChack = async user => {
    user
      ? await firestore()
          .collection('user')
          .doc(user.uid)
          .get()
          .then(querySnapshot => {
            console.log(querySnapshot.data().promote);
            setUserType(querySnapshot.data().promote);
          })
      : null;
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing)
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* <ActivityIndicator size={'large'} style={{marginTop: 200}} /> */}
        <LoadingModal visible={true} />
      </View>
    );

  return (
    <NavigationContainer>
      {/*       {user ? false ? <OfficerStack /> : <AppStack /> : <AuthStack />} */}
      <Route
        name={
          email == 'admin@gmail.com' && password == 'Admin@123' ? 'admin' : user
        }
        stack={userType}
      />
      {/*    <AdminStack /> */}
    </NavigationContainer>
  );
};

export default Routes;

const Route = props => {
  const {name, stack} = props;
  if (name == 'admin') {
    return <AdminStack />;
  } else if (name) {
    if (stack == 'public') {
      return <AppStack />;
    } else if (stack == 'officer') {
      return <OfficerStack />;
    } else {
      return <LoadingStack />;
    }
  } else {
    return <AuthStack />;
  }
};
const LoadingStack = () => {
  return <LoadingModal visible={true} />;
};
