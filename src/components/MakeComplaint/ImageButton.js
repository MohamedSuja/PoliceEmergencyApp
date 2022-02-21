import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

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
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageButton;
