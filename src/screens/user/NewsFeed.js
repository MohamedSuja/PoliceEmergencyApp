import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Divider, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import PostCard from '../../components/PostCard';
import AppHeader from '../../components/AppHeader';

const ImageUrls = [
  {
    localUrl:
      'https://d8asu6slkrh4m.cloudfront.net/2019/09/toyota-allion-260-sri-lanka.jpg',
  },
  {
    localUrl:
      'https://eh9ti3qk8yf3m8xqr5gt2fp4-wpengine.netdna-ssl.com/wp-content/uploads/2021/06/25470872_web1_210525-ABB-traffic-collisions-crash_3-768x512.jpg',
  },
  {
    localUrl:
      'https://www.dailynews.lk/sites/default/files/news/2017/04/12/z_p01-Five-killed.jpg',
  },
  {
    localUrl:
      'https://eh9ti3qk8yf3m8xqr5gt2fp4-wpengine.netdna-ssl.com/wp-content/uploads/2021/06/25470872_web1_210525-ABB-traffic-collisions-crash_3-768x512.jpg',
  },
  {
    localUrl:
      'https://www.dailynews.lk/sites/default/files/news/2017/04/12/z_p01-Five-killed.jpg',
  },
];
const CardData = [
  {
    Title: 'This car was stollen',
    Subject:
      'Call your local police department and tell them you need to file a stolen vehicle report. Be prepared to provide these details: Car make and model, license plate number, vehicle identification number (VIN), color, and year. The date and time you last saw the car.',
    Date: '21 Jan 2022',
    ifAdmin: true,
    ImageFiles: ImageUrls,
  },
  {
    Title: 'This car was excident 🚨',
    Subject:
      'Call your local police department and tell them you need to file a stolen vehicle report. Be prepared to provide these details: Car make and model, license plate number, vehicle identification number (VIN), color, and year. The date and time you last saw the car.',
    Date: '21 Jan 2022',
    ifAdmin: true,
    ImageFiles: ImageUrls,
  },
];

const NewsFeed = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />

      <AppHeader
        navigation={() => navigation.navigate('HomeBottomTab')}
        title={'NewsFeed'}
      />
      <Divider color="#000" />
      <ScrollView>
        {CardData.map((item, index) => (
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
        ))}
      </ScrollView>
    </View>
  );
};

export default NewsFeed;
