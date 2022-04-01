import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MenuButton from '../../components/home/MenuButton';
import {Avatar, Badge, Divider} from 'react-native-elements';
import AnimatedHeader from '../../components/AnimatedHeader';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {AuthContext} from '../../navigations/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const OfficerHome = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const {user} = useContext(AuthContext);

  const getData = async () => {
    await firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(querySnapshot => {
        //  console.log(querySnapshot.data());
        setUserData(querySnapshot.data());

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };

  useEffect(() => {
    getData();
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
          title={userData ? `${userData.firstName}  ${userData.lastName}` : ''}
          subTitle={userData ? userData.idNo : ''}
          onPress={() => {
            navigation.navigate('OfficerNotification');
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
          title="Add Public Report"
          icon={require('../../assets/icon/files-and-folders.png')}
          onPress={() => navigation.navigate('AddUserReport', {admin: true})}
        />
        <MenuButton
          title="Show Emergency"
          icon={require('../../assets/icon/alarm2.png')}
          onPress={() => navigation.navigate('AdminEmergency', {admin: false})}
        />
        <MenuButton
          title="News Feed"
          icon={require('../../assets/icon/newspaper.png')}
          onPress={() => navigation.navigate('OfficerNewsFeed')}
        />
      </ScrollView>
    </View>
  );
};

export default OfficerHome;
