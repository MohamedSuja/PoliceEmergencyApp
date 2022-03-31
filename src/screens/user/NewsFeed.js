import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Divider, Header} from 'react-native-elements';
import PostCard from '../../components/PostCard';
import AppHeader from '../../components/AppHeader';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigations/AuthProvider';
import PostCard2 from '../../components/PostCard2';
import LoadingModal from '../../components/LoadingModal';

const NewsFeed = ({navigation}) => {
  const [postData, setPostData] = useState([]);
  const {user, userIdNo} = useContext(AuthContext);
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

    setPostData(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  ///firebase

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
          ? postData.map((item, index) =>
              item.postPrivacy == 'Public' ? (
                <PostCard2
                  key={index}
                  indexData={index}
                  Title={item.postTitle}
                  Subject={item.post}
                  date={item.postTime}
                  ifAdmin={user.uid == item.postId ? true : false}
                  ImageFiles={item.selectImage}
                  navigation={navigation}
                  docId={item.docId}
                  navi={'NewsFeed'}
                  information={item.information}
                  admin={false}
                />
              ) : null,
            )
          : null}
      </ScrollView>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default NewsFeed;
