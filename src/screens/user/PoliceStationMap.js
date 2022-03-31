import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import MapView, {Callout, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import StationCard from '../../components/StationCard';
import {showLocation} from 'react-native-map-link';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../components/LoadingModal';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const initialState = {
  latitude: 7.9824358,
  longitude: 80.5292226,
};

const PoliceStationMap = ({route, navigation}) => {
  const [cardData, setCardData] = useState('');
  const [curentPosition, setCurentPosition] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [stationData, setStationData] = useState([]);

  //firebase
  const getData = async postList => {
    var list = [];
    var snapshot = await firestore().collection('policeStations').get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setStationData(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDelete = docId => {
    Alert.alert(
      '!Are you sure ?',
      'Remove Police Station',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deleteData(docId),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteData = docId => {
    firestore()
      .collection('policeStations')
      .doc(docId)
      .delete()
      .then(() => {
        getData();
        setCardData('');
        Alert.alert(
          'Police Station deleted!',
          'Police Station has been deleted successfully!',
        );
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  ///firebase

  const getDistance = location => {
    showLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      sourceLatitude: curentPosition.latitude,
      sourceLongitude: curentPosition.longitude,
    });
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
    checkPermission();

    navigation.addListener('focus', () => {
      getData();
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppHeader
        navigation={() => {
          route.params.admin
            ? navigation.navigate('AdminHome')
            : navigation.navigate('HomeBottomTab');
        }}
        title={'Police Station Map'}
        backgroundColor={'#0a67fc'}
        rightComponent={
          route.params.admin ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPoliceStation')}>
              <Icon name="plus" size={35} color="#fff" />
            </TouchableOpacity>
          ) : null
        }
      />
      {/*  <Button title="MyLocation" onPress={() => console.log(stationData)} /> */}
      <MapView
        showsUserLocation
        onUserLocationChange={val => {
          //  console.log(val.nativeEvent.coordinate);
          setCurentPosition({
            latitude: val.nativeEvent.coordinate.latitude,
            longitude: val.nativeEvent.coordinate.longitude,
          });
        }}
        style={{height: '100%', marginBottom: 0, backgroundColor: '#fff'}}
        initialRegion={{
          latitude: 7.9824358,
          longitude: 80.5292226,
          latitudeDelta: 2.5,
          longitudeDelta: 0.0421,
        }}>
        {stationData.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.stationLocation}
            onPress={() => setCardData(item)}>
            <Callout>
              <Text>{item.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {cardData != '' ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={{position: 'absolute', bottom: 60}}>
          <StationCard
            title={cardData.name}
            address={cardData.address}
            phone={cardData.phone}
            drectionBtn={() => getDistance(cardData.stationLocation)}
            callBtn={() => Linking.openURL(`tel:${cardData.phone}`)}
            admin={route.params.admin}
            deleteData={() => handleDelete(cardData.docId)}
          />
        </ScrollView>
      ) : null}
      <LoadingModal visible={loading} transparent />
    </View>
  );
};

export default PoliceStationMap;
