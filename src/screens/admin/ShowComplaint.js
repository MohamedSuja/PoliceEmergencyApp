import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';
import {Card} from 'react-native-paper';
import NotificationCard from '../../components/NotificationCard';

const ShowComplaint = ({navigation}) => {
  return (
    <View>
      <AppHeader
        title="Complaints"
        backgroundColor={'#0a67fc'}
        navigation={() => navigation.navigate('AdminHome')}
      />
      <ScrollView>
        <NotificationCard
          NotificationAvatar="https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg"
          mainText="Correct spelling for EXCIDENT. We think the word excident is a
            misspelling"
          postTime="1 hours ago"
          visible={true}
          onPress={() => navigation.navigate('ViewComplaint')}
        />
      </ScrollView>
    </View>
  );
};

export default ShowComplaint;
