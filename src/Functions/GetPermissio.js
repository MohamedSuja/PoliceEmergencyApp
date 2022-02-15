import React from 'react';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';

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
    })
    .catch(error => console.log('fetch error:', error));
};

const getPermission = () => {
  request(PERMISSIONS.ANDROID.CAMERA)
    .then(() => pickFromCamara())
    .catch(error => console.log(error));
};

export const checkPermission = () => {
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
