import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useCallback, useContext, useMemo, useRef} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import {TouchableRipple} from 'react-native-paper';
import ImageCropPicker from 'react-native-image-crop-picker';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {AuthContext} from '../navigations/AuthProvider';
import MapView, {Callout, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

const SCREEN_WIDTH = Dimensions.get('window').width;

const LocationPicker = props => {
  const {sheetRef, curentPosition, setCurentPosition} = props;

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

  ///end map

  const snapPoints = useMemo(() => [RFValue('550')], []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        style={{flex: 1, zIndex: 1000}}
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        opacity={0.3}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      // enablePanDownToClose
      backgroundStyle={{backgroundColor: 'rgba(257,257,257,0.8)', flex: 1}}
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      // onChange={handleSheetChanges}
    >
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.BottomSheeTitle}>Pick Location</Text>
        <MapView
          showsUserLocation
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
        <TouchableRipple>
          <Text style={{fontSize: 20, fontWeight: '900'}}>Pick</Text>
        </TouchableRipple>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  BottomSheeTitle: {
    fontSize: 20,
    fontWeight: '900',
    position: 'absolute',
    color: '#000',
    zIndex: 1000,
  },
  BottomSheetSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: SCREEN_WIDTH - 20,
    // height: 100,
  },
  BottomSheetSelectButtonIcon: {
    height: RFValue(40),
    width: RFValue(40),
    resizeMode: 'contain',
  },
  BottomSheetSelectButtonText: {
    marginLeft: RFValue(50),
    fontSize: 16,
    fontWeight: '700',
  },
});

export default LocationPicker;
