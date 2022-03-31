import {View, Text, StatusBar, ScrollView, Button, Alert} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Divider} from 'react-native-elements';
import AppHeader from '../../components/AppHeader';
import PostCard from '../../components/PostCard';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import firestore from '@react-native-firebase/firestore';
import PostCard2 from '../../components/PostCard2';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../../navigations/AuthProvider';
import LoadingModal from '../../components/LoadingModal';

const ViewAllPosts = ({navigation}) => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

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

    setPostData(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleDelete = docId => {
    Alert.alert(
      'Delete post',
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
      .collection('post')
      .doc(docId)
      .delete()
      .then(() => {
        getData();
        Alert.alert(
          'Post Card deleted!',
          'Your Post Card has been deleted successfully!',
        );
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });
    SystemNavigationBar.setNavigationColor('#1a5200', true);
  }, []);
  return (
    <View style={{flex: 1, marginBottom: RFValue('50')}}>
      <StatusBar barStyle="light-content" />

      <AppHeader
        navigation={() => navigation.navigate('AdminHome')}
        title={'View All Posts'}
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
                date={item.postTime}
                ifAdmin={true}
                postPrivacy={item.postPrivacy}
                ImageFiles={item.selectImage}
                navigation={navigation}
                navi={'ViewAllPosts'}
                deleteCard={() => handleDelete(item.docId)}
                docId={item.docId}
                information={item.information}
                admin={true}
              />
            ))
          : null}
      </ScrollView>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default ViewAllPosts;
