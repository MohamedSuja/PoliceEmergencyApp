import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const SCREEN_WIDTH = Dimensions.get('window').width;

const UserDetail = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Icon
          name="arrow-back-ios"
          size={30}
          color="#000"
          style={{margin: 10}}
        />
      </TouchableOpacity>
      <View style={{padding: 10}}>
        <TextInput
          mode="outlined"
          label={'Address'}
          left={<TextInput.Icon name="home" />}
        />
        <View
          style={{
            borderRadius: 5,
            borderColor: '#1100fa',
            borderWidth: 1,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Icon name="person" size={30} color="#000" />
          <Picker prompt="Please Select" mode="dropdown" style={{width: 300}}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default UserDetail;
