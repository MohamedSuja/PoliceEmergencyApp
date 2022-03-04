import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {Avatar, Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const AnimatedHeader = () => {
  return (
    <Animated.View
      style={{
        height: 250,
        backgroundColor: '#0a67fc',
        borderBottomRightRadius: 40,
        padding: 20,
        zIndex: 1000,
      }}>
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate('UserNotification');
        }}>
        <Animated.View
          style={{
            marginTop: 10,
            marginRight: 10,
            alignSelf: 'flex-end',
          }}>
          <Badge
            status="primary"
            value={10}
            containerStyle={{
              position: 'absolute',
              top: 0,
              left: 15,
              marginLeft: 10,
            }}
            badgeStyle={{backgroundColor: '#fc036f'}}
          />

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
            uri: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
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
          suja
        </Text>
      </Animated.View>
      <Animated.Text
        style={{
          color: '#fff',
          fontSize: 20,
          marginTop: 10,
          alignSelf: 'center',
          opacity: 1,
        }}>
        ID
      </Animated.Text>
    </Animated.View>
  );
};

export default AnimatedHeader;
