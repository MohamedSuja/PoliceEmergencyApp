import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import {Avatar, Header} from 'react-native-elements';
import AppHeader from '../../components/AppHeader';
import {RFValue} from 'react-native-responsive-fontsize';
import NotificationCard from '../../components/NotificationCard';

const SCREEN_WIDTH = Dimensions.get('window').width;

const UserNotification = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <AppHeader
        navigation={() => {
          navigation.navigate('HomeBottomTab');
        }}
        title={'Notification'}
        backgroundColor={'#0a67fc'}
      />
      <NotificationCard
        NotificationAvatar="https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg"
        mainText="Correct spelling for EXCIDENT. We think the word excident is a
            misspelling"
        postTime="1 hours ago"
      />
      <NotificationCard
        NotificationAvatar="https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg"
        mainText="Correct spelling for EXCIDENT. We think the word excident is a
            misspelling"
        postTime="10 hours ago"
        visible={true}
      />
      <NotificationCard
        mainText="Correct spelling for EXCIDENT. We think the word excident is a
            misspelling"
        postTime="12 hours ago"
        visible={true}
      />
    </View>
  );
};

export default UserNotification;
