import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import MenuButton from '../../components/home/MenuButton';
import {Avatar, Badge, Divider} from 'react-native-elements';
import AnimatedHeader from '../../components/AnimatedHeader';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const OfficerHome = ({navigation}) => {
  useEffect(() => {
    navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      SystemNavigationBar.setNavigationColor('#0a67fc', true);
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />

      <ScrollView>
        <AnimatedHeader
          title="Officer"
          subTitle="Officer Id"
          onPress={() => {
            navigation.navigate('ShowEmergency');
          }}
        />
        <MenuButton
          title="Add Fine"
          icon={require('../../assets/icon/referee.png')}
          onPress={() => navigation.navigate('AddFine')}
        />
        <MenuButton
          title="Add Emergency Post"
          icon={require('../../assets/icon/siren.png')}
          onPress={() => navigation.navigate('AddEmergencyPost')}
        />
        <MenuButton
          title="Officer News Feed"
          icon={require('../../assets/icon/newspaper.png')}
          onPress={() => navigation.navigate('OfficerNewsFeed')}
        />
      </ScrollView>
    </View>
  );
};

export default OfficerHome;
