import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import AnimatedLottieView from 'lottie-react-native';
import {AuthContext} from '../../../navigations/AuthProvider';
import {Button} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import PickerSheetModal from '../../../components/PickerSheetModal';
import LocationPicker from '../../../components/LocationPicker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {VerifyContext} from '../VerifyAccount';

const ScreenWidth = Dimensions.get('window').width;

const initialState = {
  latitude: 7.9824358,
  longitude: 80.5292226,
};

const IdBack = props => {
  const {selectImageBack, setSelectImageBack} = useContext(VerifyContext);
  const [curentPosition, setCurentPosition] = useState(initialState);
  const {submit} = props;

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 300,
      //  multiple: true,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setSelectImageBack(image.path);
        handleClosePress();
      })
      .catch(error => console.log(error));
  };
  const pickFromCamara = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.5,
      cropperStatusBarColor: '#0a67fc',
      cropperActiveWidgetColor: '#0a67fc',
    })
      .then(image => {
        console.log(image);
        setSelectImageBack(image.path);
        handleClosePress();
      })
      .catch(error => console.log('fetch error:', error));
  };

  const getPermission = () => {
    request(PERMISSIONS.ANDROID.CAMERA)
      .then(() => pickFromCamara())
      .catch(error => console.log(error));
  };

  const checkPermission = () => {
    check(PERMISSIONS.ANDROID.CAMERA).then(result => {
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
          pickFromCamara();
          break;

        case RESULTS.BLOCKED:
          alert('The permission is denied and not requestable anymore');
          break;
      }
    });
  };

  ///Start Bottom Sheet

  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [350], []);

  // callbacks
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  });
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  });
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  });
  const handlePresentModalPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  ///End Bottom Sheet

  ///Location Picker
  const LocationsheetRef = useRef(null);
  ///End Location Picker

  return (
    <View style={{flex: 1, alignItems: 'center', width: ScreenWidth}}>
      <Text style={{fontWeight: '800', fontSize: 20, marginTop: 20}}>
        Please Scan Your Id Back Side
      </Text>
      {selectImageBack == null ? (
        <AnimatedLottieView
          style={{height: 300, alignSelf: 'center'}}
          source={require('../../../assets/animation/id-card-ui-animation.json')}
          autoPlay
          speed={0.5}
          loop={true}
        />
      ) : (
        <Image
          style={{
            height: 400,
            width: ScreenWidth,
            resizeMode: 'contain',
            margin: 2.5,
          }}
          source={{uri: selectImageBack}}
        />
      )}

      <Button
        onPress={() => handlePresentModalPress()}
        style={{marginTop: 10, width: RFValue('200')}}
        mode="contained">
        Select
      </Button>

      <Button
        onPress={submit}
        style={{
          position: 'absolute',
          width: RFValue('300'),
          borderRadius: 40,
          backgroundColor: '#0a67fc',
          bottom: RFValue('60'),
        }}
        mode="contained">
        Submit ID
      </Button>

      <PickerSheetModal
        sheetRef={sheetRef}
        pickImage={pickImage}
        pickFromCamara={checkPermission}
      />
      <LocationPicker
        sheetRef={LocationsheetRef}
        curentPosition={curentPosition}
        setCurentPosition={setCurentPosition}
      />
    </View>
  );
};

export default IdBack;
