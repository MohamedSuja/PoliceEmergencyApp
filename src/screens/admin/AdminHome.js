import {View, Text, Dimensions, Button} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AdminHome = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View></View>
      <Text>AdminHome</Text>
      <Button title="post" onPress={() => navigation.navigate('AddPost')} />
      <Button
        title="comp"
        onPress={() => navigation.navigate('ShowComplaint')}
      />
      <Button
        title="emer"
        onPress={() => navigation.navigate('AdminEmergency')}
      />
    </View>
  );
};

export default AdminHome;
