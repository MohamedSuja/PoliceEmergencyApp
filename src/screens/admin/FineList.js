import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {Card} from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FineCard from '../../components/FineCard';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AddFineNameModal from '../../components/AddFineNameModal';
import ImageCropPicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import LoadingModal from '../../components/LoadingModal';

const FineList = ({navigation}) => {
  const [fineData, setFineData] = useState([]);
  const [fineName, setFineName] = useState('');
  const [fineRs, setFineRs] = useState('');
  const [selectImage, setSelectImage] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  ///firebase
  const getData = async () => {
    var list = [];
    var snapshot = await firestore()
      .collection('fineList')
      .orderBy('fineName', 'asc')
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setFineData(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const SendData = async () => {
    setBtnLoading(true);
    const imageUrl = await uploadImage();

    firestore()
      .collection('fineList')
      .add({
        fineName: fineName,
        fineRs: fineRs,
        imageUrl: imageUrl,
      })
      .then(() => {
        setBtnLoading(false);
        alert('Recorded your data');
      });
  };

  const uploadImage = async () => {
    if (selectImage == null) {
      return null;
    }

    const uploadUri = selectImage;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`finePhotos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    try {
      await task;

      const url = await storageRef.getDownloadURL();
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

  const handleDelete = docId => {
    Alert.alert(
      'Delete Fine',
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
      .collection('fineList')
      .doc(docId)
      .delete()
      .then(() => {
        getData();
        Alert.alert(
          'deleted!',
          'Your Fine Card has been deleted successfully!',
        );
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  //firebaseend

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setSelectImage(image.path);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <AppHeader
        title="Fine List"
        backgroundColor={'#0a67fc'}
        navigation={() => navigation.navigate('AdminHome')}
        rightComponent={
          <TouchableOpacity onPress={() => setDialog(true)}>
            <Icon name="plus" size={35} color="#fff" />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        {fineData.map((data, index) => (
          <FineCard
            key={index}
            data={data}
            onPress={() => handleDelete(data.docId)}
          />
        ))}
      </ScrollView>
      <AddFineNameModal
        dialog={dialog}
        fineName={fineName}
        setFineName={setFineName}
        closeBtn={() => setDialog(false)}
        fineRs={fineRs}
        setFineRs={setFineRs}
        uploadBtn={() => pickImage()}
        imageUri={selectImage}
        removeImage={() => setSelectImage(null)}
        submitBtn={() => {
          SendData();
          setDialog(false);
          getData();
        }}
        loading={btnLoading}
      />
      <LoadingModal visible={loading} />
    </View>
  );
};

export default FineList;
