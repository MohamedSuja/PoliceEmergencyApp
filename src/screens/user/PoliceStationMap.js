import {View, Text, StatusBar, TouchableOpacity, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import MapView, {Callout, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

const initialState = {
  latitude: 7.9824358,
  longitude: 80.5292226,
};

const PoliceStationMap = ({navigation}) => {
  const [curentPosition, setCurentPosition] = useState(initialState);

  const getMyPosition = () => {
    Geolocation.getCurrentPosition(
      info => {
        console.log(info);
        setCurentPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      e => alert(e.message),
    );
  };

  const getPermission = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const checkPermission = fun => {
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
          fun;
          break;

        case RESULTS.BLOCKED:
          alert('The permission is denied and not requestable anymore');
          break;
      }
    });
  };

  useEffect(() => {
    return () => {
      console.log(initialState);
    };
  }, [initialState.longitude]);

  return (
    <View style={{flex: 1}}>
      <AppHeader
        navigation={() => {
          navigation.navigate('HomeBottomTab');
        }}
        title={'PoliceStationMap'}
        backgroundColor={'#0a67fc'}
      />
      <Button
        title="MyLocation"
        onPress={() => checkPermission(getMyPosition())}
      />
      <MapView
        style={{height: '100%', marginBottom: 0, backgroundColor: '#fff'}}
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
    </View>
  );
};

export default PoliceStationMap;
