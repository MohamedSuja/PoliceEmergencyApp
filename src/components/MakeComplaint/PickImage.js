import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const PickImage = props => {
  const {key, item, onPress} = props;
  return (
    <View
      key={key}
      style={{
        height: 110,
        width: 110,
        backgroundColor: '#fff',
        margin: 5,
        alignItems: 'center',
      }}>
      <Image
        style={{
          height: '100%',
          width: 100,
          resizeMode: 'contain',
          margin: 2.5,
        }}
        source={{uri: item}}
      />
      <TouchableOpacity
        onPress={() => onPress}
        style={{position: 'absolute', right: 0}}>
        <Icon name={'remove-circle-outline'} size={30} color={'#2e0300'} />
      </TouchableOpacity>
    </View>
  );
};

export default PickImage;
