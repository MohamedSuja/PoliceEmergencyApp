import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {AirbnbRating, Header} from 'react-native-elements';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {Divider} from 'react-native-elements';
import ProfileMenu from '../../components/home/ProfileMenu';

const UserProfile = () => {
  useEffect(() => {
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
          User Name
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
        <ProfileMenu icon="mail" title="Email" text="user1234@gmailcom" />
        <ProfileMenu
          icon="ios-phone-portrait-outline"
          title="Mobile"
          text="077769690"
        />
        <ProfileMenu icon="home" title="Address" text="Balaluwewa,Palagala." />
        <ProfileMenu icon="ios-person" title="Gender" text="Male" />
        <ProfileMenu
          icon="md-calendar-sharp"
          title="Date Of Birth"
          text="1 April 1997"
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
