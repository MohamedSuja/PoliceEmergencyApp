import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const BottomTab = () => {
  return (
    <View style={{height: 100, backgroundColor: '#0a67fc'}}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{height: '100%'}}>
        <Text></Text>
      </LinearGradient>
    </View>
  );
};

export default BottomTab;
