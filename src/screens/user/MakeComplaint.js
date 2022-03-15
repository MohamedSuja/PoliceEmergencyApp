import {
  View,
  Text,
  StatusBar,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import MainButton from '../../components/MainButton';
import {Card, Divider, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {checkPermission} from '../../Functions/GetPermissio';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextInput, TouchableRipple} from 'react-native-paper';
import PickImage from '../../components/MakeComplaint/PickImage';
import ImageButton from '../../components/MakeComplaint/ImageButton';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigations/AuthProvider';
import PickerSheetModal from '../../components/PickerSheetModal';
import storage from '@react-native-firebase/storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const uploadUrl = [
  'file:///storage/emulated/0/Android/data/com.policeapp2/files/Pictures/016af012-4cb5-4f1b-8633-0cdacc3c0414.jpg',
  'file:///storage/emulated/0/Android/data/com.policeapp2/files/Pictures/37e5a260-5d7d-4f3c-8089-e9e35883f90a.jpg',
];

const MakeComplaint = gestureHandlerRootHOC(({navigation}) => {
  const ImageUrls = [];
  const [complaintTitle, setComplaintTitle] = useState(null);
  const [complaint, setComplaint] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const {user} = useContext(AuthContext);
  // ! test
  const [selectImage, setSelectImage] = useState(ImageUrls);
  const [uploadUri, setUploadUri] = useState([]);

  const SendData = () => {
    firestore()
      .collection('complaint')
      .doc(user.uid)
      .set({
        complaintTitle: complaintTitle,
        complaint: complaint,
        location: userLocation,
        selectImage: selectImage,
      })
      .then(() => {
        alert(' You are recorded!');
      });
  };
  //start

  /*   const uploadImage = () => {
    var promises = uploadUrl.map(async (image, index) => {
      let filename = image.substring(image.lastIndexOf('/') + 1);
      const task = storage().ref(`complaintPhotos/${filename}`).putFile(image);
      //  promises.push(task);
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      try {
        await task;

        await storage()
          .ref(`complaintPhotos/${filename}`)
          .getDownloadURL()
          .then(url => {
            setUploadUri(prevState => [...prevState, url]);
          });
      } catch (e) {
        console.log(e);
      }
    });

    Promise.all(promises)
      .then(() => console.log(uploadUri))
      .catch(err => console.log(err));
  }; */
  // end

  const uploadImage = () => {
    uploadUrl.map(async (image, index) => {
      let filename = image.substring(image.lastIndexOf('/') + 1);
      const task = storage().ref(`complaintPhotos/${filename}`).putFile(image);

      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      try {
        await task;

        await storage()
          .ref(`complaintPhotos/${filename}`)
          .getDownloadURL()
          .then(res => {
            console.log(res);
            setUploadUri(res);
          });
      } catch (e) {
        console.log(e);
      }
    });
  };

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 300,
      // TODO: multiple: true,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setSelectImage([...selectImage, image.path]);
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
        setSelectImage([...selectImage, image.path]);
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

  const cleanTempFiles = () => {
    ImageCropPicker.clean()
      .then(() => {
        console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };
  ///Start Bottom Sheet

  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [250], []);

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

  return (
    <View style={{flex: 1, marginBottom: 30}}>
      <Header
        leftContainerStyle={{marginLeft: 5}}
        leftComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeBottomTab')}>
            <Icon name="arrow-back-ios" size={30} color="#fff" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text
            style={{
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 20,
            }}>
            Make A Complaint
          </Text>
        }
        backgroundColor="#0a67fc"
      />
      <StatusBar barStyle="light-content" />
      <ScrollView
        nestedScrollEnabled
        style={{padding: 20, marginTop: 30, height: '100%', marginBottom: 0}}>
        <TextInput
          value={complaintTitle}
          onChangeText={val => setComplaintTitle(val)}
          mode="outlined"
          label="Complaint Title"
          style={{
            // borderColor: 'black', borderWidth: 2,
            borderRadius: 5,
          }}
        />
        <TextInput
          value={complaint}
          onChangeText={val => setComplaint(val)}
          mode="outlined"
          multiline
          numberOfLines={50}
          label="Complaint"
          style={{
            //borderColor: 'black',
            //   borderWidth: 2,
            marginTop: 20,
            height: 400,
            textAlignVertical: 'top',
            borderRadius: 5,
          }}
        />
        <View
          View
          style={{marginTop: 15, flexDirection: 'row', alignSelf: 'center'}}>
          {selectImage.map((item, index) => (
            <PickImage item={item} key={index} />
          ))}
        </View>
        <Card
          containerStyle={{margin: 0}}
          wrapperStyle={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 0,
          }}>
          <ImageButton
            onPress={() => handlePresentModalPress()}
            source={require('../../assets/icon/photo.png')}
            title="Pick Images"
          />
          <Divider
            width={2}
            orientation="vertical"
            style={{marginLeft: 20, marginRight: 20}}
          />
          <ImageButton
            onPress={() => {}}
            source={require('../../assets/icon/placeholder.png')}
            title="Pick Location"
          />
        </Card>

        {/* //!test button*/}
        <Button title="test" onPress={() => uploadImage()} />
        <Button title="test2" onPress={() => console.log(uploadUri)} />

        <MainButton
          text="Submit"
          btnStyle={{margin: 10, marginBottom: 50}}
          onPress={() => SendData()}
        />
      </ScrollView>
      <BottomSheetModalProvider>
        <PickerSheetModal
          sheetRef={sheetRef}
          pickImage={pickImage}
          pickFromCamara={checkPermission}
        />
      </BottomSheetModalProvider>
    </View>
  );
});

const styles = StyleSheet.create({});
export default MakeComplaint;
