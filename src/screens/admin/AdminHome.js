import {View, Text, Dimensions} from 'react-native';
import React from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AdminHome = () => {
  return (
    <View style={{flex: 1}}>
      <Text>AdminHome</Text>
    </View>
  );
};

export default AdminHome;
