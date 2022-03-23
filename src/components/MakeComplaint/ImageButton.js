import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

const ImageButton = ({onPress, source, title}) => {
  return (
    <View
      style={{
        height: 80,
        width: 90,
        margin: 5,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{alignItems: 'center'}}
        activeOpacity={0.5}>
        <Image
          style={{
            height: '80%',
            width: 100,
            resizeMode: 'contain',
          }}
          source={source}
        />
        <Text
          style={{
            color: '#000',
            fontSize: RFValue('12'),
            fontWeight: '900',
            width: RFValue('120'),
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageButton;
