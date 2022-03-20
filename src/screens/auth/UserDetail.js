import {View, Text, TouchableOpacity, Dimensions, Button} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/AppHeader';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const SCREEN_WIDTH = Dimensions.get('window').width;

const UserDetail = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleConfirm = date => {
    setDateOfBirth(date.toString());
    setDatePickerVisibility(false);
  };

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
        <TouchableOpacity
          style={{marginTop: 20}}
          activeOpacity={1}
          onPress={() => setDatePickerVisibility(true)}>
          <TextInput
            mode="outlined"
            label={'Date Of Birth'}
            left={<TextInput.Icon name="cake" />}
            onPressIn={() => setDatePickerVisibility(true)}
            editable={false}
            value={dateOfBirth}
            //ghgh onChangeText={val => setDateOfBirth(val)}
          />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

export default UserDetail;
