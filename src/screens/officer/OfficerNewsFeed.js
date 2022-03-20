import {View, Text, StatusBar, ScrollView, Button} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Divider} from 'react-native-elements';
import AppHeader from '../../components/AppHeader';
import PostCard from '../../components/PostCard';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import firestore from '@react-native-firebase/firestore';
import PostCard2 from '../../components/PostCard2';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../../navigations/AuthProvider';

const OfficerNewsFeed = ({navigation}) => {
  const [postData, setPostData] = useState([]);
  const {user, userIdNo} = useContext(AuthContext);

  const getData = async postList => {
    var list = [];
    var snapshot = await firestore().collection('post').get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push(item);
      console.log(item);
    });

    setPostData(list);
  };

  useEffect(() => {
    getData();
    SystemNavigationBar.setNavigationColor('#1a5200', true);
  }, []);
  return (
    <View style={{flex: 1, marginBottom: RFValue('50')}}>
      <StatusBar barStyle="light-content" />

      <AppHeader
        navigation={() => navigation.navigate('OfficerBottomTab')}
        title={'Feed'}
        backgroundColor={'#1a5200'}
      />
      <Divider color="#000" />

      <ScrollView>
        {postData
          ? postData.map((item, index) => (
              <PostCard2
                key={index}
                indexData={index}
                Title={item.postTitle}
                Subject={item.post}
                Date={''}
                ifAdmin={user.uid == item.postId ? true : false}
                ImageFiles={item.selectImage}
                navigation={navigation}
              />
            ))
          : null}
      </ScrollView>
    </View>
  );
};

export default OfficerNewsFeed;
