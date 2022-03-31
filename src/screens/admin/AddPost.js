import {
  View,
  Text,
  Button,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useContext, useRef, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import ImageCropPicker from 'react-native-image-crop-picker';
import PickerSheetModal from '../../components/PickerSheetModal';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import PickImage from '../../components/MakeComplaint/PickImage';
import {TextInput, TouchableRipple} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import MainButton from '../../components/MainButton';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../../navigations/AuthProvider';
import LoadingModal from '../../components/LoadingModal';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AddPost = gestureHandlerRootHOC(({navigation}) => {
  const ImageUrls = [];
  const [selectImage, setSelectImage] = useState(ImageUrls);
  const [postPrivacy, setPostPrivacy] = useState('Public');
  const [post, setPost] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);

  const sheetRef = useRef(null);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const handlePresentModalPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 300,
      multiple: true,
      cropping: true,
    })
      .then(image => {
        console.log(image.map(item => item.path));
        setSelectImage([...selectImage, ...image.map(item => item.path)]);
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

  //!firebase
  const submitPost = async () => {
    setLoading(true);
    const imageUrl = await uploadImage();
    firestore()
      .collection('post')
      .add({
        postTitle: postTitle,
        post: post,
        postPrivacy: postPrivacy,
        selectImage: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        alert(' You are recorded!');
        setTimeout(() => {
          setLoading(false);
        }, 1500);
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

  return (
    <View style={{flex: 1, marginBottom: RFValue('47')}}>
      <AppHeader
        title="Add Posts"
        backgroundColor={'#0a67fc'}
        navigation={() => navigation.navigate('AdminHome')}
        rightComponent={
          <TouchableOpacity
            accessibilityHint="Select Image"
            onPress={() => {
              handlePresentModalPress();
            }}>
            <Image
              source={require('../../assets/icon/photo.png')}
              style={{
                height: 50,
                width: 50,
              }}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <TextInput
          value={postTitle}
          onChangeText={val => setPostTitle(val)}
          mode="outlined"
          label="Title"
          style={{
            // borderColor: 'black', borderWidth: 2,
            borderRadius: 5,
            margin: 5,
          }}
        />
        <TextInput
          value={post}
          onChangeText={val => setPost(val)}
          style={{
            height: RFValue('300'),
            width: SCREEN_WIDTH - 10,
            alignSelf: 'center',
            backgroundColor: '#fff',
          }}
          mode="outlined"
          multiline
          label="Post"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text>Post Privacy</Text>
          <View
            style={{
              width: RFValue('120'),
              borderRadius: 5,
            }}>
            <Picker
              prompt="Please Select"
              selectedValue={postPrivacy}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                setPostPrivacy(itemValue)
              }>
              <Picker.Item label="Public" value="Public" style={{height: 20}} />
              <Picker.Item label="Officer" value="Officer" />
            </Picker>
          </View>
        </View>
        <ScrollView horizontal>
          <FlatList
            style={{alignSelf: 'center'}}
            data={selectImage}
            numColumns={3}
            renderItem={({item, index}) => (
              <PickImage item={item} key={index} />
            )}
          />
        </ScrollView>
      </ScrollView>

      <View style={{width: SCREEN_WIDTH - 20, alignSelf: 'center'}}>
        <MainButton text={'Submit Post'} onPress={() => submitPost()} />
      </View>

      <BottomSheetModalProvider>
        <PickerSheetModal
          sheetRef={sheetRef}
          pickImage={pickImage}
          pickFromCamara={pickFromCamara}
        />
      </BottomSheetModalProvider>
      <LoadingModal visible={loading} transparent />
    </View>
  );
});

export default AddPost;
