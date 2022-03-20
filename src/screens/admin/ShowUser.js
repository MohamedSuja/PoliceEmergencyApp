import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import UserCard from '../../components/UserCard';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../components/LoadingModal';
import {SearchBar} from 'react-native-elements';
import PromoteDialogModel from '../../components/PromoteDialogModel';

const ShowUser = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState({
    visible: false,
    title: '',
    uid: '',
  });
  const [idType, setIdType] = useState('public');
  const [btnLoading, setBtnLoading] = useState(false);

  const getData = async () => {
    var list = [];
    var snapshot = await firestore().collection('user').get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push(item);
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setUserData(list);
  };

  const updateUserType = async id => {
    setBtnLoading(true);
    await firestore()
      .collection('user')
      .doc(id)
      .update({
        promote: idType,
      })
      .then(() => {
        setTimeout(() => {
          getData();
          setBtnLoading(false);
        }, 1000);

        console.log('User updated!');
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <AppHeader
        title="All Users"
        backgroundColor={'#0a67fc'}
        navigation={() => navigation.navigate('AdminHome')}
      />
      <SearchBar
        placeholder="Search"
        onChangeText={text => setSearch(text)}
        value={search}
        lightTheme
      />
      {userData.map((item, index) => (
        <UserCard
          key={index}
          onPress={() => {
            setShowDialog({
              visible: true,
              title: item.firstName + ' ' + item.lastName,
              uid: item.userId,
            });
            setIdType(item.promote);
          }}
          name={item.firstName + ' ' + item.lastName}
          id={item.idNo}
          userType={item.promote}
        />
      ))}
      <PromoteDialogModel
        visible={showDialog.visible}
        title={showDialog.title}
        onPressClose={() => setShowDialog({visible: false})}
        selectedValue={idType}
        onValueChange={itemValue => setIdType(itemValue)}
        onPressSave={() => updateUserType(showDialog.uid)}
        loading={btnLoading}
      />
      <LoadingModal visible={loading} transparent={false} />
    </View>
  );
};

export default ShowUser;
