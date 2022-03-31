import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {Picker} from '@react-native-picker/picker';
import {Input} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
import EmergencyModal from '../../components/EmergencyModal';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigations/AuthProvider';
import MapView, {Callout, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

const SCREEN_WIDTH = Dimensions.get('window').width;

const initialState = {
  latitude: 7.9824358,
  longitude: 80.5292226,
};

const Emergency = ({navigation}) => {
  const [emergencyType, setEmergencyType] = useState('Excident');
  const [emergencyDiscription, setEmergencyDiscription] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState([]);
  const {user} = useContext(AuthContext);
  const [curentPosition, setCurentPosition] = useState(initialState);

  ///start firebase
  const SendData = () => {
    firestore()
      .collection('emergency')
      .add({
        userId: user.uid,
        emergencyType: emergencyType,
        emergencyDiscription: emergencyDiscription,
        location: curentPosition,
        date: firestore.Timestamp.fromDate(new Date()),
        name: userData.firstName + ' ' + userData.lastName,
        view: false,
      })
      .then(() => {
        console.log(' You are recorded!');
      });
  };

  const getUserData = async id => {
    try {
      await firestore()
        .collection('user')
        .doc(id)
        .get()
        .then(querySnapshot => {
          setUserData(querySnapshot.data());
        });
    } catch (error) {
      return error;
    }
  };
  ///end firebase

  ///start map

  const getMyPosition = () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log(info);
        setCurentPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      e => console.log(e.message),
    );
  };

  const getPermission = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const checkPermission = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      console.log(result);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          alert('This feature is not available on this device');
          break;

        case RESULTS.DENIED:
          getPermission();
          break;

        case RESULTS.GRANTED:
          console.log('The permission is granted');
          getMyPosition();
          break;

        case RESULTS.BLOCKED:
          alert('The permission is denied and not requestable anymore');
          break;
      }
    });
  };

  ///end map
  useEffect(() => {
    SystemNavigationBar.setNavigationColor('#e00074', true);
    checkPermission();
    getUserData(user.uid);
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <AppHeader
        navigation={() => {
          navigation.navigate('HomeBottomTab');
        }}
        title={'Emergency'}
        backgroundColor={'#e00074'}
      />
      <Text>Please Use only Emergency Time</Text>
      <View
        style={{
          width: SCREEN_WIDTH - 10,
          borderRadius: 5,
          borderColor: 'red',
          borderWidth: 1,
        }}>
        <Picker
          prompt="Please Select"
          selectedValue={emergencyType}
          mode="dialog"
          onValueChange={(itemValue, itemIndex) => setEmergencyType(itemValue)}>
          <Picker.Item label="Excident" value="Excident" />
          <Picker.Item label="Trouble For Other" value="TroubleForOther" />
          <Picker.Item label="Fighting" value="Fighting" />
          <Picker.Item label="Robbery" value="Robbery" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <TextInput
        mode="flat"
        label="Short Discription"
        style={{width: SCREEN_WIDTH - 10, backgroundColor: 'transparent'}}
        onChangeText={val => setEmergencyDiscription(val)}
        value={emergencyDiscription}
      />

      <MapView
        loadingEnableds
        showsUserLocation
        style={{
          height: '100%',
          width: '100%',
        }}
        onLongPress={e => {
          setCurentPosition({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
          console.log(e.nativeEvent.coordinate);
        }}
        initialRegion={{
          latitude: 7.9824358,
          longitude: 80.5292226,
          latitudeDelta: 2.5,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          draggable
          onDragEnd={e => {
            setCurentPosition({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
            console.log(e.nativeEvent.coordinate);
          }}
          coordinate={{
            ...curentPosition,
          }}>
          <Callout>
            <Text>My Location</Text>
          </Callout>
        </Marker>
      </MapView>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          SendData();
        }}
        activeOpacity={0.7}
        style={{
          flex: 1,
          position: 'absolute',
          backgroundColor: 'rgba(66, 0, 2, .8)',
          borderRadius: 30,
          alignSelf: 'center',
          bottom: 50,
          zIndex: 999,
          width: 200,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Get A Cop</Text>
        </View>
      </TouchableOpacity>

      <EmergencyModal
        onLongPress={() => setModalVisible(false)}
        modalVisible={modalVisible}
      />
    </View>
  );
};

export default Emergency;
