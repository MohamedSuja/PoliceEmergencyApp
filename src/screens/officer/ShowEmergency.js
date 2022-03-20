import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';

const ShowEmergency = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <AppHeader
        navigation={() => {
          navigation.navigate('OfficerBottomTab');
        }}
        title={'Emergency'}
        backgroundColor={'#0a67fc'}
      />
      <View style={{backgroundColor: 'grey', flex: 1}}></View>
    </View>
  );
};

export default ShowEmergency;
