import React, {createContext, useContext, useRef, useState} from 'react';
import {View, Text, Dimensions, ScrollView, Button, Alert} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {AuthContext} from '../../navigations/AuthProvider';
import {Picker} from '@react-native-picker/picker';
import SelectView from './VerfyAccountPages/SelectView';
import IdFront from './VerfyAccountPages/IdFront';
import IdBack from './VerfyAccountPages/IdBack';
import {RFValue} from 'react-native-responsive-fontsize';
import AppHeader from '../../components/AppHeader';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import LoadingModal from '../../components/LoadingModal';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const ScreenWidth = Dimensions.get('window').width;

export const VerifyContext = createContext();

const VerifyAccount = ({navigation}) => {
  const [selectImageFront, setSelectImageFront] = useState();
  const [selectImageBack, setSelectImageBack] = useState();

  return (
    <VerifyContext.Provider
      value={{
        selectImageFront,
        setSelectImageFront,
        selectImageBack,
        setSelectImageBack,
      }}>
      <VerifyAccountComponent navigation={navigation} />
    </VerifyContext.Provider>
  );
};

const VerifyAccountComponent = gestureHandlerRootHOC(({navigation}) => {
  const {user} = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const {selectImageFront, selectImageBack} = useContext(VerifyContext);

  ///firbase
  const Verify = async () => {
    setUploading(true);

    const imageUrlFront = await uploadImage(selectImageFront);
    const imageUrlBack = await uploadImage(selectImageBack);

    firestore()
      .collection('verify')
      .doc(user.uid)
      .set({
        verify: false,
        idFront: imageUrlFront,
        idBack: imageUrlBack,
      })
      .then(() => {
        setUploading(false);
        Alert.alert(
          'Alert',
          'Record Your Request',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('HomeBottomTab'),
            },
          ],
          {cancelable: false},
        );
      });
  };

  const uploadImage = async selectImage => {
    if (selectImage.length == null) {
      return null;
    }

    const uploadUri = selectImage;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    //setUploading(true);

    const storageRef = storage().ref(`IDPhotos/${filename}`);
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

  ///endFiebase

  const scrollViewRef = useRef();

  const slide = index => {
    scrollViewRef.current.scrollTo({
      x: ScreenWidth * index,
      y: 0,
      animated: true,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: RFValue('50'),
      }}>
      <AppHeader
        navigation={() => navigation.navigate('HomeBottomTab')}
        title={'Verify Account'}
        backgroundColor="#7a004e"
      />
      {/* <Button title="test" onPress={() => Verify()} /> */}
      <BottomSheetModalProvider>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}>
          <SelectView next={() => slide(1)} />
          <IdFront next={() => slide(2)} />
          <IdBack submit={() => Verify()} />
        </ScrollView>
      </BottomSheetModalProvider>

      <LoadingModal visible={uploading} />
    </View>
  );
});

export default VerifyAccount;
