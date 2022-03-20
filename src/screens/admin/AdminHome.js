import {
  View,
  Text,
  Dimensions,
  Button,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';
import AnimatedHeader from '../../components/AnimatedHeader';
import MenuButton from '../../components/home/MenuButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AdminHome = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <AnimatedHeader
        title="Admin"
        subTitle="Welcome to admin"
        onPress={() => {
          navigation.navigate('ShowEmergency');
        }}
      />
      <ScrollView>
        <MenuButton
          title="Add Post"
          icon={require('../../assets/icon/addPost.png')}
          onPress={() => navigation.navigate('AddPost')}
        />
        <MenuButton
          title="Show Complaint"
          icon={require('../../assets/icon/businessman.png')}
          onPress={() => navigation.navigate('ShowComplaint')}
        />
        <MenuButton
          title="Admin Emergency"
          icon={require('../../assets/icon/alarm2.png')}
          onPress={() => navigation.navigate('AdminEmergency')}
        />
        <MenuButton
          title="View All Users"
          icon={require('../../assets/icon/profile.png')}
          onPress={() => navigation.navigate('ShowUser')}
        />
      </ScrollView>
    </View>
  );
};

export default AdminHome;
