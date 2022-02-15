import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-elements';

const ProfileMenu = props => {
  const {icon, title, text} = props;

  return (
    <View style={{padding: 15}}>
      <View style={{flexDirection: 'row'}}>
        <Icon name={icon} size={30} />
        <Text style={{fontSize: 20, marginLeft: 10, fontWeight: '900'}}>
          {title}
        </Text>
      </View>
      <Text style={{fontSize: 18, marginLeft: 45, color: '#000'}}>{text}</Text>
      <Divider width={1.5} style={{marginTop: 20}} />
    </View>
  );
};

export default ProfileMenu;
