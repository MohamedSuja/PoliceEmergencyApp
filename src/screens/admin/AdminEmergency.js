import {View, Text} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';

const AdminEmergency = ({navigation}) => {
  return (
    <View>
      <AppHeader
        title="Emergency"
        backgroundColor={'#0a67fc'}
        navigation={() => navigation.navigate('AdminHome')}
      />
    </View>
  );
};

export default AdminEmergency;
