import {View, Text, TouchableOpacity, Dimensions, Modal} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {Picker} from '@react-native-picker/picker';
import {Input} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import EmergencyModal from '../../components/EmergencyModal';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigations/AuthProvider';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Emergency = ({navigation}) => {
  const [emergencyType, setEmergencyType] = useState('TroubleForOther');
  const [emergencyDiscription, setEmergencyDiscription] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const {user} = useContext(AuthContext);

  const SendData = () => {
    firestore()
      .collection('emergency')
      .doc(user.uid)
      .set({
        emergencyType: emergencyType,
        emergencyDiscription: emergencyDiscription,
        location: userLocation,
      })
      .then(() => {
        console.log(' You are recorded!');
      });
  };

  useEffect(() => {
    SystemNavigationBar.setNavigationColor('#e00074', true);
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <AppHeader
        navigation={() => {
          navigation.navigate('HomeBottomTab');
        }}
        title={'Emergency'}
        backgroundColor={'#e00074'}
      />
      <Text>Please Use only Emergency Time</Text>
      <View
        style={{
          width: SCREEN_WIDTH - 10,
          borderRadius: 5,
          borderColor: 'red',
          borderWidth: 1,
        }}>
        <Picker
          prompt="Please Select"
          selectedValue={emergencyType}
          mode="dialog"
          onValueChange={(itemValue, itemIndex) => setEmergencyType(itemValue)}>
          <Picker.Item
            label="Trouble For Other"
            value="TroubleForOther"
            style={{backgroundColor: 'red'}}
          />
          <Picker.Item label="Fighting" value="Fighting" />
          <Picker.Item label="Robbery" value="Robbery" />
          <Picker.Item label="Excident" value="Excident" />
        </Picker>
      </View>

      <TextInput
        mode="flat"
        label="Short Discription"
        style={{width: SCREEN_WIDTH - 10, backgroundColor: 'transparent'}}
        onChangeText={val => setEmergencyDiscription(val)}
        value={emergencyDiscription}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          SendData();
        }}
        activeOpacity={0.7}
        style={{
          flex: 1,
          position: 'absolute',
          backgroundColor: 'rgba(66, 0, 2, .8)',
          borderRadius: 30,
          alignSelf: 'center',
          bottom: 50,
          zIndex: 999,
          width: 200,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Get A Cop</Text>
        </View>
      </TouchableOpacity>

      <EmergencyModal
        onLongPress={() => setModalVisible(false)}
        modalVisible={modalVisible}
      />
    </View>
  );
};

export default Emergency;
