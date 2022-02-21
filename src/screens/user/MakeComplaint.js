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
import React, {useCallback, useMemo, useRef, useState} from 'react';
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

const SCREEN_WIDTH = Dimensions.get('window').width;

const MakeComplaint = gestureHandlerRootHOC(({navigation}) => {
  const ImageUrls = [];
  // ! test
  const [selectImage, setSelectImage] = useState(ImageUrls);

  const fetchData = () => {
    setSelectImage([
      ...selectImage,
      'https://www.dailynews.lk/sites/default/files/news/2017/04/12/z_p01-Five-killed.jpg',
    ]);
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
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        opacity={0.3}
      />
    ),
    [],
  );

  const MyBottomSheetModal = ({children}) => {
    return (
      <BottomSheetModal
        // enablePanDownToClose
        backgroundStyle={{backgroundColor: '#ffffff'}}
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}

        // onChange={handleSheetChanges}
      >
        {children}
      </BottomSheetModal>
    );
  };
  ///End Bottom Sheet

  return (
    <BottomSheetModalProvider>
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
          backgroundColor="#0a67fc"
        />
        <StatusBar barStyle="light-content" />
        <ScrollView
          nestedScrollEnabled
          style={{padding: 20, marginTop: 30, height: '100%', marginBottom: 0}}>
          <TextInput
            mode="outlined"
            label="Complaint Title"
            style={{
              // borderColor: 'black', borderWidth: 2,
              borderRadius: 5,
            }}
          />
          <TextInput
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

          <MainButton
            text="Submit"
            btnStyle={{margin: 10, marginBottom: 100}}
            onPress={() => setSelectImage(ImageUrls)}
          />
        </ScrollView>

        <MyBottomSheetModal>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.BottomSheeTitle}>Add Photo</Text>
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .32)"
              onPress={() => {
                checkPermission();
              }}>
              <View style={styles.BottomSheetSelectButton}>
                <Image
                  style={styles.BottomSheetSelectButtonIcon}
                  source={require('../../assets/icon/camera.png')}
                />
                <Text style={styles.BottomSheetSelectButtonText}>
                  Take a Photo
                </Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .32)"
              onPress={() => {
                pickImage();
              }}>
              <View style={styles.BottomSheetSelectButton}>
                <Image
                  style={styles.BottomSheetSelectButtonIcon}
                  source={require('../../assets/icon/photos.png')}
                />
                <Text style={styles.BottomSheetSelectButtonText}>
                  Upload from Photos
                </Text>
              </View>
            </TouchableRipple>
          </View>
        </MyBottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  BottomSheeTitle: {
    fontSize: 20,
    fontWeight: '800',
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
export default MakeComplaint;
