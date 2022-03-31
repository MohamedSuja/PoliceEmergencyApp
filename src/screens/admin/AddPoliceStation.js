import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {Button, TextInput} from 'react-native-paper';
import MapView, {Callout, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../components/LoadingModal';

const SCREEN_WIDTH = Dimensions.get('window').width;

const initialState = {
  latitude: 7.9824358,
  longitude: 80.5292226,
};

const AddPoliceStation = ({navigation}) => {
  const [stationLocation, setStationLocation] = useState(initialState);
  const [visible, setVisible] = useState(true);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  //fire base
  const SendData = async () => {
    setLoading(true);
    await firestore()
      .collection('policeStations')
      .add({
        name: name,
        address: address,
        phone: phone,
        stationLocation: stationLocation,
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          alert('Recorded your data');
        }, 1000);
      });
  };
  // end firebase

  return (
    <View style={{flex: 1}}>
      <AppHeader
        title="Add Police Station"
        backgroundColor={'#0a67fc'}
        navigation={() =>
          navigation.navigate('PoliceStationMap', {admin: true})
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => (visible ? setVisible(false) : setVisible(true))}>
            <Icon name="eye" size={35} color="#fff" />
          </TouchableOpacity>
        }
      />
      {visible ? (
        <KeyboardAvoidingView
          style={{position: 'absolute', zIndex: 1000, bottom: RFValue('100')}}
          // keyboardVerticalOffset={RFValue('120')}
          behavior="position">
          <View
            style={{
              padding: 10,
              margin: 5,
              width: SCREEN_WIDTH - 8,
              backgroundColor: 'rgba(259,257,257,0.5)',
              borderRadius: 8,
            }}>
            <TextInput
              mode="outlined"
              label="Police Station Name"
              value={name}
              onChangeText={val => setName(val)}
            />
            <TextInput
              mode="outlined"
              label="Police Station Address"
              style={{marginTop: 10}}
              value={address}
              onChangeText={val => setAddress(val)}
            />
            <TextInput
              mode="outlined"
              label="Police Station Phone Number"
              keyboardType="phone-pad"
              style={{marginTop: 10}}
              value={phone}
              onChangeText={val => setPhone(val)}
            />
          </View>
        </KeyboardAvoidingView>
      ) : null}

      <MapView
        focusable
        showsUserLocation
        onLongPress={e => {
          setStationLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
          console.log(e.nativeEvent.coordinate);
        }}
        style={{
          height: '100%',
          width: '100%',
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
            setStationLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
            console.log(e.nativeEvent.coordinate);
          }}
          coordinate={{
            ...stationLocation,
          }}>
          <Callout>
            <Text>Selected Location</Text>
          </Callout>
        </Marker>
      </MapView>
      {visible ? (
        <Button
          onPress={() => SendData()}
          mode="contained"
          style={{
            margin: 10,
            marginTop: 10,
            height: RFValue('50'),
            width: SCREEN_WIDTH - 14,
            position: 'absolute',
            bottom: RFValue('40'),
            alignSelf: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>
            Add A Police Station
          </Text>
        </Button>
      ) : null}
      <LoadingModal visible={loading} transparent />
    </View>
  );
};

export default AddPoliceStation;
