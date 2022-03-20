import {View, Text} from 'react-native';
import React from 'react';
import {Avatar, Card} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {TouchableRipple} from 'react-native-paper';

const UserCard = props => {
  const {onPress, name, id, userType} = props;
  return (
    <TouchableRipple onPress={onPress}>
      <Card
        containerStyle={{
          margin: RFValue('5'),
          padding: RFValue('5'),
          backgroundColor: 'transparent',
        }}
        wrapperStyle={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar
          size={64}
          containerStyle={{}}
          avatarStyle={{borderRadius: 15}}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
          }}
        />
        <View style={{marginLeft: RFValue('10')}}>
          <Text
            style={{fontWeight: '900', fontSize: RFValue('18'), color: '#000'}}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: RFValue('14'),
              fontWeight: '700',
              marginLeft: 10,
            }}>
            ID: {id}
          </Text>
          <Text
            style={{
              fontSize: RFValue('14'),
              fontWeight: '700',
              marginLeft: 10,
            }}>
            User Type : {userType}
          </Text>
        </View>
      </Card>
    </TouchableRipple>
  );
};

export default UserCard;
