import {View, Text} from 'react-native';
import React from 'react';
import {Avatar, Card} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {TouchableRipple} from 'react-native-paper';

const UserCard = props => {
  const {onPress, onLongPress, name, id, userType, promote} = props;
  return (
    <TouchableRipple onLongPress={onLongPress} onPress={onPress}>
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
            uri:
              promote == 'officer'
                ? 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fsecurity-man.png?alt=media&token=09d6333e-2b0c-4bec-a455-7a5cec874e92'
                : 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fprofile.png?alt=media&token=3f39996d-91a9-44bd-9275-6fc421e8d9f4',
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
