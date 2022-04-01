import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../components/LoadingModal';
import NotificationCard from '../../components/NotificationCard';

const SCREEN_WIDTH = Dimensions.get('window').width;

const OfficerNotification = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //firebase
  const getData = async postList => {
    var list = [];
    var snapshot = await firestore()
      .collection('post')
      .orderBy('postTime', 'desc')
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setData(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  ///firebase

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <AppHeader
        navigation={() => {
          navigation.navigate('OfficerBottomTab');
        }}
        title={'Notification'}
        backgroundColor={'#0a67fc'}
      />

      <ScrollView>
        {data
          ? data.map((item, index) => (
              <NotificationCard
                onPress={() => navigation.navigate('OfficerNewsFeed')}
                key={index}
                NotificationAvatar="https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg"
                mainText={item.postTitle}
                postTime={item.postTime}
              />
            ))
          : null}
      </ScrollView>
      <LoadingModal visible={loading} transparent={false} />
    </View>
  );
};

export default OfficerNotification;
