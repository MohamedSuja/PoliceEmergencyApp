import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../components/LoadingModal';
import NotificationCard from '../../components/NotificationCard';

const SCREEN_WIDTH = Dimensions.get('window').width;

const UserNotification = ({navigation}) => {
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
          navigation.navigate('HomeBottomTab');
        }}
        title={'Notification'}
        backgroundColor={'#0a67fc'}
      />

      {/* <NotificationCard
        NotificationAvatar="https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg"
        mainText="Correct spelling for EXCIDENT. We think the word excident is a
            misspelling"
        //  postTime="1 hours ago"
      /> */}

      <ScrollView>
        {data
          ? data.map((item, index) =>
              item.postPrivacy == 'Public' ? (
                <NotificationCard
                  onPress={() => navigation.navigate('NewsFeed')}
                  key={index}
                  NotificationAvatar="https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg"
                  mainText={item.postTitle}
                  postTime={item.postTime}
                />
              ) : null,
            )
          : null}
      </ScrollView>
      <LoadingModal visible={loading} transparent={false} />
    </View>
  );
};

export default UserNotification;
