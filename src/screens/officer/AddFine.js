import {View, Text, Modal, ScrollView, Button} from 'react-native';
import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native-paper';
import MainButton from '../../components/MainButton';
import SlideList from '../../components/AddFine/SlideList';
import AppHeader from '../../components/AppHeader';
import FineModal from '../../components/AddFine/FineModal';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/dist/Fontisto';

const AddFine = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [addFine, setAddFine] = useState([]);
  const [idNo, setIdNo] = useState();
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

  const total = addFine
    .map(item => Number(item.price))
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
              idNo ? getData() : alert('Please enter a valid ID')
            }
          />
        }
      />

      <View style={{margin: 10}}>
        <MainButton text="Add Fine" onPress={() => setModalVisible(true)} />
      </View>
      <ScrollView>
        {addFine.map((item, index) => (
          <SlideList
            key={index}
            text={item.title}
            subText={item.price}
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
          onPress={() => (idNo ? SendData() : alert('Please enter a valid ID'))}
        />
      </View>
    </View>
  );
};

export default AddFine;
