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
import {RFValue} from 'react-native-responsive-fontsize';

const UserProfile = ({navigation}) => {
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
              uri:
                userData.promote == 'officer'
                  ? 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fsecurity-man.png?alt=media&token=09d6333e-2b0c-4bec-a455-7a5cec874e92'
                  : 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fprofile.png?alt=media&token=3f39996d-91a9-44bd-9275-6fc421e8d9f4',
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
            marginLeft: RFValue('50'),
            alignSelf: 'baseline',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CharacterReports', {
                userType: userData.promote,
              })
            }>
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
            isDisabled
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
