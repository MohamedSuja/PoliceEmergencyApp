import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/dist/Entypo';

const SCREEN_WIDTH = Dimensions.get('window').width;

const NotificationCard = props => {
  const {NotificationAvatar, mainText, postTime, visible} = props;
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View
        style={{
          flexDirection: 'row',
          width: SCREEN_WIDTH,
          backgroundColor: visible
            ? 'rgba(217, 215, 215, 0.7)'
            : 'rgba(255, 0, 0,0.5)',
          marginBottom: 4,
        }}>
        {NotificationAvatar ? (
          <Avatar
            size={64}
            containerStyle={{margin: 10}}
            avatarStyle={{borderRadius: 15}}
            source={{
              uri: NotificationAvatar,
            }}
          />
        ) : null}

        <View
          style={{
            margin: 10,
            width: NotificationAvatar ? RFValue(280) : SCREEN_WIDTH,
          }}>
          <Text style={{fontWeight: 'bold', textAlign: 'auto', fontSize: 15}}>
            {mainText}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Icon name="back-in-time" size={20} color="#000" />
            <Text style={{marginLeft: 5}}>{postTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
