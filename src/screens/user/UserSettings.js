import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import React, {useContext} from 'react';
import MainButton from '../../components/MainButton';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../../navigations/AuthProvider';
import {Header} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';

const SCREEN_WIDTH = Dimensions.get('window').width;

const UserSettings = () => {
  const {user, logout} = useContext(AuthContext);
  const addUserData = async () => {
    firestore()
      .collection('appUser')
      .add({
        userId: 'user.uid',
        firstName: 'a',
        lastName: 'b',
        idNo: 'c',
      })
      .then(() => {
        console.log('Post Added!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.setingsHeader}>
        <Text style={styles.titleTextStyle}>App Setings</Text>
      </View>

      <Text>{user.uid}</Text>
      <Button title="test" onPress={() => addUserData()} />
      <MainButton
        text="Sign Out"
        disabled={false}
        onPress={() => logout()}
        btnStyle={styles.btnStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#100061',
    margin: 30,
    width: SCREEN_WIDTH - 50,
    position: 'absolute',
    bottom: 0,
  },
  titleTextStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  setingsHeader: {
    backgroundColor: '#100061',
    alignItems: 'center',
    height: RFValue(70),
    paddingTop: RFValue(20),
  },
});

export default UserSettings;
