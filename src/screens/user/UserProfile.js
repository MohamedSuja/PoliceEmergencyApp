import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AirbnbRating, Header} from 'react-native-elements';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {Divider} from 'react-native-elements';
import ProfileMenu from '../../components/home/ProfileMenu';
import {AuthContext} from '../../navigations/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const UserProfile = () => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(querySnapshot => {
        setUserData(querySnapshot.data());
      });
    SystemNavigationBar.setNavigationColor('#7a004e', true);

    return () => {
      SystemNavigationBar.setNavigationColor('#7a004e', true);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerStyle}>
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            fontWeight: '800',
            marginTop: 20,
          }}>
          Profile
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
            }}
            style={styles.profileImageStyle}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            fontWeight: '800',
            marginTop: 10,
          }}>
          {userData.firstName + ' ' + userData.lastName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            marginTop: 10,
            marginLeft: 10,
            alignSelf: 'baseline',
          }}>
          <TouchableOpacity>
            <Text style={{color: '#fff', marginTop: 10}}>
              Character Reports 12
            </Text>
          </TouchableOpacity>

          <Divider
            width={2}
            orientation="vertical"
            style={{marginLeft: 20, marginRight: 20}}
          />
          <Text style={{color: '#fff'}}>4.8 / 5</Text>
          <AirbnbRating
            size={15}
            reviews={[]}
            starContainerStyle={{position: 'absolute', bottom: 0}}
          />
        </View>
      </View>
      <ScrollView>
        <ProfileMenu icon="mail" title="Email" text={user.email} />
        <ProfileMenu
          icon="ios-phone-portrait-outline"
          title="Mobile"
          text={userData.phoneNumber}
        />
        <ProfileMenu icon="home" title="Address" text={userData.address} />
        <ProfileMenu icon="ios-person" title="Gender" text={userData.gender} />
        <ProfileMenu
          icon="md-calendar-sharp"
          title="Date Of Birth"
          text={userData.dateOfBirth}
        />
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#7a004e',
    height: 400,
    alignItems: 'center',
    borderBottomRightRadius: 20,
    //borderBottomLeftRadius: 20,
  },
  profileImageStyle: {
    height: 200,
    width: 200,
    marginTop: 10,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 2,
  },
});
