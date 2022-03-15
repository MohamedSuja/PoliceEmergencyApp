import {View, Text, Image} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';

const IconButton = props => {
  const {} = props;
  return (
    <TouchableRipple
      style={{
        backgroundColor: 'rgba(151, 152, 153,0.8)',
        margin: 10,
        borderRadius: 7,
        height: 60,
        borderColor: '#000',
        borderWidth: 2.5,
      }}
      onPress={() => {}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
        }}>
        <Image
          source={require('../assets/icon/placeholder1.png')}
          style={{height: 50, width: 50, alignSelf: 'center'}}
        />
        <Text
          style={{
            alignSelf: 'center',
            color: '#000',
            fontWeight: '800',
            fontSize: 20,
            marginLeft: 20,
          }}>
          Show Location
        </Text>
      </View>
    </TouchableRipple>
  );
};

export default IconButton;
