import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {Card} from 'react-native-paper';
import NotificationCard from '../../components/NotificationCard';
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native-elements';
import LoadingModal from '../../components/LoadingModal';

const ShowComplaint = ({navigation}) => {
  const [complaintData, setComplaintData] = useState([]);
  const [loading, setLoading] = useState(true);

  //firebase
  const getData = async () => {
    var list = [];
    var snapshot = await firestore()
      .collection('complaint')
      .orderBy('date', 'desc')
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setComplaintData(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const updateVisible = async id => {
    await firestore()
      .collection('complaint')
      .doc(id)
      .update({
        visible: true,
      })
      .then(() => {
        console.log('visible updated!');
      });
  };

  //endFirebase
  useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });
  }, []);

  //endfirebase
  return (
    <View style={{flex: 1}}>
      <AppHeader
        title="Complaints"
        backgroundColor={'#0a67fc'}
        navigation={() => navigation.navigate('AdminHome')}
      />
      {/* <Button title={'test'} /> */}
      <ScrollView>
        {complaintData.map((item, index) => (
          <NotificationCard
            key={index}
            NotificationAvatar={item.selectImage}
            mainText={item.complaintTitle}
            postTime={item.date}
            visible={item.visible}
            onPress={() => {
              navigation.navigate('ViewComplaint', {
                complaintTitle: item.complaintTitle,
                complaint: item.complaint,
                complaintId: item.complaintId,
                date: item.date,
                location: item.location,
                selectImage: item.selectImage,
              });
              updateVisible(item.docId);
            }}
          />
        ))}
      </ScrollView>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default ShowComplaint;
