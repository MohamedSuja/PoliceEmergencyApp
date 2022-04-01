import {
  View,
  Text,
  Dimensions,
  Button,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import AppHeader from '../../components/AppHeader';
import AnimatedHeader from '../../components/AnimatedHeader';
import MenuButton from '../../components/home/MenuButton';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {RFValue} from 'react-native-responsive-fontsize';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AdminHome = ({navigation}) => {
  useEffect(() => {
    navigation.addListener('focus', () => {
      SystemNavigationBar.setNavigationColor('#0a67fc', true);
    });
  }, []);
  return (
    <View style={{flex: 1, marginBottom: RFValue('55')}}>
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
          title="Show Emergency"
          icon={require('../../assets/icon/alarm2.png')}
          onPress={() => navigation.navigate('AdminEmergency', {admin: true})}
        />
        <MenuButton
          title="View All Users"
          icon={require('../../assets/icon/profile.png')}
          onPress={() => navigation.navigate('ShowUser')}
        />
        <MenuButton
          title="View All Posts"
          icon={require('../../assets/icon/newspaper.png')}
          onPress={() => navigation.navigate('ViewAllPosts')}
        />
        <MenuButton
          title="Police Stations"
          icon={require('../../assets/icon/police-station-2.png')}
          onPress={() => navigation.navigate('PoliceStationMap', {admin: true})}
        />
        <MenuButton
          title="Edit Fine List"
          icon={require('../../assets/icon/add.png')}
          onPress={() => navigation.navigate('FineList')}
        />
      </ScrollView>
    </View>
  );
};

export default AdminHome;
