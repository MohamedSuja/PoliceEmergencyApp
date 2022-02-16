import React from 'react';
import {View, Text, LogBox} from 'react-native';
import Providers from './src/navigations';

const App = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
  return <Providers />;
};

export default App;
