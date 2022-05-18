import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {Button} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Idview = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const {userVerefyData, userData} = route.params;
  //firebase

  const updateUserType = async id => {
    setLoading(true);
    await firestore()
      .collection('verify')
      .doc(id)
      .update({
        verify: true,
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        console.log('User updated!');
        alert('User Verified');
      });
  };

  //endFirebase

  const conform = () => {
    Alert.alert(
      'Confirm Verify',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => updateUserType(userData.userId),
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    console.log(userVerefyData);
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppHeader
        title="User Details"
        backgroundColor={'#0a67fc'}
        navigation={() => navigation.navigate('ShowUser')}
      />
      <ScrollView>
        <Text style={{alignSelf: 'center'}}>Front Side</Text>
        <Image
          source={{
            uri: userVerefyData.idFront,
          }}
          style={{width: SCREEN_WIDTH, height: 300, resizeMode: 'cover'}}
        />
        <Text style={{alignSelf: 'center'}}>Back Side</Text>
        <Image
          source={{
            uri: userVerefyData.idBack,
          }}
          style={{width: SCREEN_WIDTH, height: 300, resizeMode: 'cover'}}
        />
        <Button
          style={styles.saveBtn}
          labelStyle={{fontSize: RFValue(18)}}
          loading={loading}
          mode="contained"
          disabled={loading}
          onPress={() => conform()}>
          Verefy User Account
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    alignSelf: 'center',
    width: 350,
    marginBottom: 100,
    marginTop: 20,
  },
});

export default Idview;
