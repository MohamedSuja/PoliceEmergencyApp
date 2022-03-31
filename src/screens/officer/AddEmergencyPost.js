import {View, Text, ScrollView} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AppHeader from '../../components/AppHeader';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {TextInput} from 'react-native-paper';
import MainButton from '../../components/MainButton';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import PickerSheetModal from '../../components/PickerSheetModal';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import LocationPicker from '../../components/LocationPicker';
import {Card, Divider} from 'react-native-elements';
import ImageButton from '../../components/MakeComplaint/ImageButton';
import PickImage from '../../components/MakeComplaint/PickImage';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {AuthContext} from '../../navigations/AuthProvider';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import LoadingModal from '../../components/LoadingModal';
import {RFValue} from 'react-native-responsive-fontsize';

const AddEmergencyPost = gestureHandlerRootHOC(({navigation}) => {
  const [emergencyTitle, setEmergencyTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [privacy, setPrivacy] = useState('Officer');
  const [selectImage, setSelectImage] = useState([]);
  const {user, userIdNo} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  ///start picker

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 300,
      //  multiple: true,
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

  ///end picker

  ///firebase

  const submitPost = async () => {
    setLoading(true);
    const imageUrl = await uploadImage();
    firestore()
      .collection('post')
      .add({
        postTitle: emergencyTitle,
        post: description,
        postPrivacy: privacy,
        selectImage: imageUrl,
        postId: user.uid,
        postTime: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        setLoading(false);
        alert(' You are recorded!');
      });
  };

  const uploadImage = async () => {
    if (selectImage.length == 0) {
      return null;
    }

    const uploadUri = selectImage[0];
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    //setUploading(true);

    const storageRef = storage().ref(`complaintPhotos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    try {
      await task;

      const url = await storageRef.getDownloadURL();

      // setUploading(false);
      console.log(
        'Image uplaoded!',
        'Your image has been uploaded to the firebase cloud stroage Successsfully!',
      );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  //endfirebase

  ///Start Bottom Sheet

  const sheetRef = useRef(null);

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

  useEffect(() => {
    SystemNavigationBar.setNavigationColor('#b35120', true);
  }, []);

  return (
    <View style={{flex: 1, marginBottom: 30}}>
      <AppHeader
        navigation={() => {
          navigation.navigate('OfficerBottomTab');
        }}
        title={'Add Emergency Post'}
        backgroundColor={'#b35120'}
      />

      <ScrollView
        nestedScrollEnabled
        style={{
          padding: 20,
          height: '100%',
          marginBottom: 0,
        }}>
        <TextInput
          value={emergencyTitle}
          onChangeText={val => setEmergencyTitle(val)}
          mode="outlined"
          label="Emergency Title"
          style={{
            // borderColor: 'black', borderWidth: 2,
            borderRadius: 5,
          }}
        />
        <View
          style={{
            width: 150,
            alignSelf: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AntDesign name="eye" size={30} color="#000" />
          <Picker
            style={{width: RFValue('120')}}
            prompt="Please Select"
            selectedValue={privacy}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => setPrivacy(itemValue)}>
            <Picker.Item label="Officer" value="Officer" />
            <Picker.Item label="Public" value="Public" />
          </Picker>
        </View>
        <TextInput
          value={description}
          onChangeText={val => setDescription(val)}
          mode="outlined"
          multiline
          numberOfLines={50}
          label="Description"
          style={{
            //borderColor: 'black',
            //   borderWidth: 2,
            // marginTop: 20,
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
          {/*  <Divider
            width={2}
            orientation="vertical"
            style={{marginLeft: 20, marginRight: 20}}
          />
          <ImageButton
            onPress={() => {
              LocationsheetRef.current?.present();
            }}
            source={require('../../assets/icon/placeholder.png')}
            title="Pick Location"
          /> */}
        </Card>

        <MainButton
          text="Submit"
          btnStyle={{
            marginTop: 20,
            marginBottom: 50,
            backgroundColor: '#b35120',
          }}
          onPress={() => submitPost()}
        />
      </ScrollView>
      <BottomSheetModalProvider>
        <PickerSheetModal
          sheetRef={sheetRef}
          pickImage={pickImage}
          pickFromCamara={checkPermission}
        />
        {/*   <LocationPicker sheetRef={LocationsheetRef} /> */}
      </BottomSheetModalProvider>
      <LoadingModal visible={loading} transparent={true} />
    </View>
  );
});

export default AddEmergencyPost;
