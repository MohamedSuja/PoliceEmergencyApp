import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const AppHeader = ({navigation, ...props}) => {
  return (
    <Header
      leftContainerStyle={{marginLeft: 5}}
      leftComponent={
        <TouchableOpacity onPress={navigation}>
          <Icon name="arrow-back-ios" size={30} color="#fff" />
        </TouchableOpacity>
      }
      centerComponent={
        <Text
          style={{
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 20,
          }}>
          {props.title}
        </Text>
      }
    />
  );
};

export default AppHeader;
