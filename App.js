import React, {useEffect} from 'react';
import {View, Text, LogBox} from 'react-native';
import Providers from './src/navigations';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
  return <Providers />;
};

export default App;
