import {
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import React from 'react';
import MainButton from '../../components/MainButton';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {checkPermission} from '../../Functions/GetPermissio';

const MakeComplaint = ({navigation}) => {
  const ImageUrls = [
    {
      localUrl:
        'https://eh9ti3qk8yf3m8xqr5gt2fp4-wpengine.netdna-ssl.com/wp-content/uploads/2021/06/25470872_web1_210525-ABB-traffic-collisions-crash_3-768x512.jpg',
    },
    {
      localUrl:
        'https://www.dailynews.lk/sites/default/files/news/2017/04/12/z_p01-Five-killed.jpg',
    },
  ];

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
    }).then(images => {
      console.log(images);
      ImageUrls.push({localUrl: images.path});
    });
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

  return (
    <View style={{flex: 1}}>
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
      />
      <StatusBar barStyle="light-content" />
      <ScrollView
        nestedScrollEnabled
        style={{padding: 20, marginTop: 30, height: '100%', marginBottom: 0}}>
        <TextInput
          placeholder="Complaint Title"
          style={{borderColor: 'black', borderWidth: 2}}
        />
        <TextInput
          multiline
          numberOfLines={50}
          placeholder="Complaint"
          style={{
            borderColor: 'black',
            borderWidth: 2,
            marginTop: 20,
            height: 400,
            textAlignVertical: 'top',
          }}
        />
        <ScrollView horizontal style={{marginTop: 15}}>
          {ImageUrls.map((item, index) => (
            <View
              key={index}
              style={{
                height: 110,
                width: 110,
                backgroundColor: 'grey',
                margin: 5,
              }}>
              <Image
                style={{
                  height: '100%',
                  width: 110,
                  resizeMode: 'contain',
                }}
                source={{uri: item.localUrl}}
              />
            </View>
          ))}

          <View
            style={{
              height: 110,
              width: 110,

              margin: 5,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => checkPermission()}>
              <Image
                style={{
                  height: '100%',
                  width: 100,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/icon/photo.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Button title="Select Location" onPress={() => cleanTempFiles()} />
        <MainButton
          text="Submit"
          btnStyle={{margin: 10, marginBottom: 100}}
          onPress={() =>
            ImageUrls.push({
              localUrl:
                'file:///storage/emulated/0/Android/data/com.policeapp2/files/Pictures/087282eb-93ea-46aa-ad6a-c34a0bc73f0f.jpg',
            })
          }
        />
      </ScrollView>
    </View>
  );
};

export default MakeComplaint;
