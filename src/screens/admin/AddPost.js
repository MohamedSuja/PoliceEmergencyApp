import {
  View,
  Text,
  Button,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
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
import {AuthContext} from '../../navigations/AuthProvider';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AddPost = gestureHandlerRootHOC(({navigation}) => {
  const ImageUrls = [];
  const [selectImage, setSelectImage] = useState(ImageUrls);
  const [postPrivacy, setPostPrivacy] = useState('Public');
  const [post, setPost] = useState();
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
  const submitPost = () => {
    firestore()
      .collection('post')
      .add({
        post: post,
        postPrivacy: postPrivacy,
        selectImage: selectImage,
      })
      .then(() => {
        alert(' You are recorded!');
      });
  };

  const uploadImage = () => {};

  return (
    <View style={{flex: 1}}>
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
        placeholder="Posts"
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
            onValueChange={(itemValue, itemIndex) => setPostPrivacy(itemValue)}>
            <Picker.Item label="Public" value="Public" style={{height: 20}} />
            <Picker.Item label="Officer" value="Officer" />
          </Picker>
        </View>
      </View>
      <FlatList
        style={{alignSelf: 'center'}}
        data={selectImage}
        numColumns={3}
        renderItem={({item, index}) => <PickImage item={item} key={index} />}
      />

      <View style={{width: SCREEN_WIDTH - 20, margin: 70, alignSelf: 'center'}}>
        <MainButton text={'Submit Post'} onPress={() => submitPost()} />
      </View>

      <BottomSheetModalProvider>
        <PickerSheetModal
          sheetRef={sheetRef}
          pickImage={pickImage}
          pickFromCamara={pickFromCamara}
        />
      </BottomSheetModalProvider>
    </View>
  );
});

export default AddPost;
