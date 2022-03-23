import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import EmerrgencyCard from '../../components/EmerrgencyCard';
import firestore from '@react-native-firebase/firestore';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import LoadingModal from '../../components/LoadingModal';

const AdminEmergency = ({navigation}) => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  //const {user, userIdNo} = useContext(AuthContext);

  const getData = async postList => {
    var list = [];
    var snapshot = await firestore()
      .collection('emergency')
      .orderBy('date', 'desc')
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push(item);
      console.log(item);
    });

    setPostData(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getData();
    SystemNavigationBar.setNavigationColor('#1a5200', true);
  }, []);

  return (
    <View>
      <AppHeader
        title="Emergency"
        backgroundColor={'#1a5200'}
        navigation={() => navigation.navigate('AdminHome')}
      />
      {postData.map((item, index) => (
        <EmerrgencyCard
          key={index}
          onPressView={async () => {}}
          time={item.date}
          emergency={item.emergencyType}
          request={item.name}
          discription={item.emergencyDiscription}
        />
      ))}
      {/*  <Button title="test" onPress={() => console.log()} /> */}
      <LoadingModal visible={loading} />
    </View>
  );
};

export default AdminEmergency;
