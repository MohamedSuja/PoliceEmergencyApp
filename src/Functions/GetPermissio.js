import React from 'react';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

const getPermission = () => {
  request(PERMISSIONS.ANDROID.CAMERA)
    .then(result => console.log(result))
    .catch(error => console.log(error));
};

export const checkPermission = fun => {
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
