import {View, Text, Modal, ScrollView, Button, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native-paper';
import MainButton from '../../components/MainButton';
import SlideList from '../../components/AddFine/SlideList';
import AppHeader from '../../components/AppHeader';
import FineModal from '../../components/AddFine/FineModal';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import {Avatar} from 'react-native-elements';

const AddFine = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [addFine, setAddFine] = useState([]);
  const [idNo, setIdNo] = useState();
  const [publicData, setPublicData] = useState([]);
  const chacked = (data, checkboxValue) => {
    checkboxValue
      ? setAddFine([...addFine, data])
      : setAddFine([...addFine.filter(item => item.title != data.title)]);
  };

  const SendData = () => {
    firestore()
      .collection('fine')
      .doc(idNo)
      .set({
        Fine: addFine,
      })
      .then(() => {
        alert('User added!');
      });
  };
  const getData = () => {
    firestore()
      .collection('fine')
      .doc(idNo)
      .get()
      .then(querySnapshot => {
        // console.log(querySnapshot.data());
        setAddFine(querySnapshot.data().Fine);
      });
  };

  const getPublicData = async () => {
    var list = [];
    var snapshot = await firestore()
      .collection('user')
      .where('idNo', '==', idNo)
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setPublicData(list);
    getData();
  };

  const handleSent = () => {
    Alert.alert(
      'Are you sure?',
      'Add Penalty',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => SendData(),
        },
      ],
      {cancelable: false},
    );
  };

  const total = addFine
    .map(item => Number(item.fineRs))
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <View style={{flex: 1}}>
      <AppHeader
        navigation={() => navigation.navigate('OfficerBottomTab')}
        title={'Make Penalty'}
        backgroundColor={'#0052fe'}
      />

      <TextInput
        value={idNo}
        onChangeText={val => setIdNo(val)}
        style={{margin: 10}}
        label="Id No"
        right={
          <TextInput.Icon
            name={() => <Icon name="search" size={25} />}
            onPress={() =>
              idNo ? getPublicData() : alert('Please enter a valid ID')
            }
          />
        }
      />
      {publicData[0] ? (
        <View style={{flexDirection: 'row'}}>
          <Avatar
            size={64}
            containerStyle={{marginLeft: 10, marginRight: 15}}
            avatarStyle={{borderRadius: 15}}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fprofile.png?alt=media&token=3f39996d-91a9-44bd-9275-6fc421e8d9f4',
            }}
          />
          <View style={{marginTop: 8}}>
            <Text style={{color: '#000', fontSize: 14, fontWeight: '700'}}>
              {publicData[0].firstName + ' ' + publicData[0].lastName}
            </Text>
            <Text>{publicData[0].address}</Text>
          </View>
        </View>
      ) : null}
      <View style={{margin: 10}}>
        <MainButton text="Add Fine" onPress={() => setModalVisible(true)} />
      </View>
      <ScrollView>
        {addFine.map((item, index) => (
          <SlideList
            key={index}
            text={item.fineName}
            subText={item.fineRs}
            onPress={() => {
              addFine.splice(index, 1);
              setAddFine([...addFine]);
            }}
          />
        ))}
      </ScrollView>
      <FineModal
        modalVisible={modalVisible}
        btnPress={() => setModalVisible(false)}
        closeBtn={() => setModalVisible(false)}
        chacked={chacked}
        listData={addFine}
      />
      <View style={{margin: 10, marginBottom: 50}}>
        <MainButton
          text={'Sent Penalty ' + total + ' Rs'}
          onPress={() =>
            idNo ? handleSent() : alert('Please enter a valid ID')
          }
        />
      </View>
    </View>
  );
};

export default AddFine;
