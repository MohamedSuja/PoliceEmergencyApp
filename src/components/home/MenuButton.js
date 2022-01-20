import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-elements';

const MenuButton = props => {
  const {icon, title, onPress} = props;
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Card
        containerStyle={{
          marginLeft: 7,
          marginRight: 7,
          marginTop: 4,
          flex: 1,
          height: 90,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            style={{
              height: 80,
              width: 80,
              resizeMode: 'contain',
              marginRight: 25,
            }}
            source={icon}
          />
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {title}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default MenuButton;
