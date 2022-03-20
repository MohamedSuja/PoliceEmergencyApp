import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Divider, Header} from 'react-native-elements';
import PostCard from '../../components/PostCard';
import AppHeader from '../../components/AppHeader';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigations/AuthProvider';
import PostCard2 from '../../components/PostCard2';

const NewsFeed = ({navigation}) => {
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
    //  SystemNavigationBar.setNavigationColor('#1a5200', true);
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />

      <AppHeader
        navigation={() => navigation.navigate('HomeBottomTab')}
        title={'NewsFeed'}
      />
      <Divider color="#000" />
      <ScrollView>
        {/* {CardData.map((item, index) => (
          <PostCard
            key={index}
            indexData={index}
            Title={item.Title}
            Subject={item.Subject}
            Date={item.Date}
            ifAdmin={item.ifAdmin}
            ImageFiles={item.ImageFiles}
            navigation={navigation}
          />
        ))} */}
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

export default NewsFeed;
