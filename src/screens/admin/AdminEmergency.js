import {
  View,
  Text,
  Button,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import EmerrgencyCard from '../../components/EmerrgencyCard';
import firestore from '@react-native-firebase/firestore';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import LoadingModal from '../../components/LoadingModal';
import {showLocation} from 'react-native-map-link';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

const initialState = {
  latitude: 7.9824358,
  longitude: 80.5292226,
};

const AdminEmergency = ({route, navigation}) => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curentPosition, setCurentPosition] = useState(initialState);
  //const {user, userIdNo} = useContext(AuthContext);

  const [isFetching, setIsFetching] = useState(false);
  const onRefresh = () => {
    setIsFetching(true);
    getData();
  };
  ///firebae
  const getData = async () => {
    var list = [];
    var snapshot = await firestore()
      .collection('emergency')
      .orderBy('date', 'desc')
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setPostData(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setTimeout(() => {
      setIsFetching(false);
    }, 500);
  };
  const handleDelete = docId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
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
      .collection('emergency')
      .doc(docId)
      .delete()
      .then(() => {
        getData();
        Alert.alert(
          'Emergency Card deleted!',
          'Your Emergency Card has been deleted successfully!',
        );
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  const updateUserType = async id => {
    await firestore()
      .collection('emergency')
      .doc(id)
      .update({
        view: true,
      })
      .then(() => {
        getData();

        console.log('User updated!');
      });
  };

  //firebase

  ///map
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

  const emergencyDistance = location => {
    showLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      sourceLatitude: curentPosition.latitude,
      sourceLongitude: curentPosition.longitude,
    });
  };
  const emergencyLocation = location => {
    showLocation({
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };
  ///map
  useEffect(() => {
    getData();
    getPermission();
    SystemNavigationBar.setNavigationColor('#1a5200', true);
  }, []);

  return (
    <View>
      <AppHeader
        title="Emergency"
        backgroundColor={'#1a5200'}
        navigation={() =>
          navigation.navigate(
            route.params.admin ? 'AdminHome' : 'OfficerBottomTab',
          )
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }>
        {postData.map((item, index) => (
          <EmerrgencyCard
            admin={route.params.admin}
            key={index}
            onPressView={() => {
              updateUserType(item.docId);
              emergencyDistance(item.location);
            }}
            onPressShare={() => {
              updateUserType(item.docId);
              emergencyLocation(item.location);
            }}
            onPressDel={() => handleDelete(item.docId)}
            time={item.date}
            emergency={item.emergencyType}
            request={item.name}
            discription={item.emergencyDiscription}
            viewed={item.view}
          />
        ))}
      </ScrollView>

      {/*  <Button title="test" onPress={() => console.log()} /> */}
      <LoadingModal visible={loading} />
    </View>
  );
};

export default AdminEmergency;
