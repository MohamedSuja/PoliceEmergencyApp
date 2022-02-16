import {View, Text, TouchableOpacity, Dimensions, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {Picker} from '@react-native-picker/picker';
import {Input} from 'react-native-elements';
import AnimatedLottieView from 'lottie-react-native';
import {TextInput} from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Emergency = ({navigation}) => {
  const [emergencyType, setEmergencyType] = useState();
  const [modalVisible, setModalVisible] = useState(false);

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
      <Picker
        style={{
          width: 300,
          height: 40,

          backgroundColor: 'red',
        }}
        selectedValue={emergencyType}
        mode="dialog"
        onValueChange={(itemValue, itemIndex) => setEmergencyType(itemValue)}>
        <Picker.Item label="Please Select" value="" enabled={false} />
        <Picker.Item
          label="Trouble For Other"
          value="TroubleForOther"
          style={{backgroundColor: 'red'}}
        />
        <Picker.Item label="Fighting" value="Fighting" />
        <Picker.Item label="Robbery" value="Robbery" />
        <Picker.Item label="Excident" value="Excident" />
      </Picker>

      <TextInput
        mode="flat"
        label="Short Discription"
        style={{width: SCREEN_WIDTH - 10, backgroundColor: 'transparent'}}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
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

      <Modal
        statusBarTranslucent
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        //  onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0,0.4)',
          }}>
          <Text
            style={{
              fontWeight: '800',
              fontSize: 20,
              alignSelf: 'center',
              color: '#fff',
            }}>
            Immediately We Take Action
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            onLongPress={() => setModalVisible(false)}>
            <AnimatedLottieView
              style={{height: 300, alignSelf: 'center'}}
              source={require('../../assets/animation/alert-icon-exclamation.json')}
              autoPlay
              speed={0.5}
              loop={true}
            />
            <Text
              style={{fontWeight: '800', fontSize: 20, alignSelf: 'center'}}>
              Long Press To Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Emergency;
