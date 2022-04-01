import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {Avatar, Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';

const AnimatedHeader = props => {
  const {onPress, title, subTitle} = props;
  return (
    <Animated.View
      style={{
        height: 250,
        backgroundColor: '#0a67fc',
        borderBottomRightRadius: 40,
        padding: 20,
        zIndex: 1000,
      }}>
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={{
            marginTop: 10,
            marginRight: 10,
            alignSelf: 'flex-end',
          }}>
          {/*   <Badge
            status="primary"
            value={10}
            containerStyle={{
              position: 'absolute',
              top: 0,
              left: 15,
              marginLeft: 10,
            }}
            badgeStyle={{backgroundColor: '#fc036f'}}
          /> */}

          <Icon name="md-notifications-outline" size={30} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Avatar
          size={64}
          containerStyle={{}}
          avatarStyle={{borderRadius: 15}}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fsecurity-man.png?alt=media&token=09d6333e-2b0c-4bec-a455-7a5cec874e92',
          }}
        />
        <Badge
          status="success"
          containerStyle={{
            position: 'absolute',
            top: 0,
            left: 55,
          }}
          badgeStyle={{height: 10, width: 10}}
        />
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 30,
            marginLeft: 40,
            alignSelf: 'center',
          }}>
          {title}
        </Text>
      </Animated.View>
      <Animated.Text
        style={{
          color: '#fff',
          fontSize: 20,
          marginTop: 10,
          // alignSelf: 'center',
          marginLeft: RFValue(98),
          opacity: 1,
        }}>
        {subTitle}
      </Animated.Text>
    </Animated.View>
  );
};

export default AnimatedHeader;
