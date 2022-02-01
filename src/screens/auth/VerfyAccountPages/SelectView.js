import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AnimatedLottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';

const ScreenWidth = Dimensions.get('window').width;

const SelectView = () => {
  const [selecIdType, setSelecteIdType] = useState('Pleace Select One');

  return (
    <View style={{flex: 1, alignItems: 'center', width: ScreenWidth}}>
      <Text style={{fontWeight: '800', fontSize: 20, marginTop: 20}}>
        Please Select Your Id Type
      </Text>

      <Picker
        style={{width: 200, marginTop: 100}}
        selectedValue={selecIdType}
        mode="dialog"
        onValueChange={(itemValue, itemIndex) => setSelecteIdType(itemValue)}>
        <Picker.Item label="Please Select" value="" enabled={false} />
        <Picker.Item
          label="Driving License"
          value="DrivingLicense"
          style={{backgroundColor: 'red'}}
        />
        <Picker.Item label="NIC Card" value="NIC" />
      </Picker>
      <AnimatedLottieView
        style={{height: 200, alignSelf: 'center'}}
        source={require('../../../assets/animation/73181-select.json')}
        autoPlay
        speed={0.2}
        loop={false}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}>
        <Icon name="chevron-with-circle-right" size={60} color="#2e12e3" />
      </TouchableOpacity>
    </View>
  );
};

export default SelectView;
