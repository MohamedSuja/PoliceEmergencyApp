import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AnimatedLottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';

const ScreenWidth = Dimensions.get('window').width;

const SelectView = props => {
  const [selecIdType, setSelecteIdType] = useState();
  const {next} = props;
  return (
    <View style={{flex: 1, alignItems: 'center', width: ScreenWidth}}>
      <Text style={{fontWeight: '800', fontSize: 20, marginTop: 20}}>
        Please Select Your Id Type
      </Text>
      <View
        style={{
          width: ScreenWidth - 10,
          borderRadius: 5,
          borderColor: 'blue',
          borderWidth: 1,
          marginTop: 40,
        }}>
        <Picker
          selectedValue={selecIdType}
          mode="dialog"
          onValueChange={(itemValue, itemIndex) => setSelecteIdType(itemValue)}>
          <Picker.Item label="Please Select" value="" />
          <Picker.Item
            label="Driving License"
            value="DrivingLicense"
            style={{backgroundColor: 'red'}}
          />
          <Picker.Item label="NIC Card" value="NIC" />
        </Picker>
      </View>

      <AnimatedLottieView
        style={{height: 200, alignSelf: 'center'}}
        source={require('../../../assets/animation/73181-select.json')}
        autoPlay
        speed={0.2}
        loop={false}
      />
      <TouchableOpacity
        disabled={!selecIdType}
        onPress={next}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}>
        <Icon
          name="chevron-with-circle-right"
          size={60}
          color={selecIdType ? '#2e12e3' : 'grey'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SelectView;
