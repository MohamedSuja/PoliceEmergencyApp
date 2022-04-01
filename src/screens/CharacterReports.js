import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import AppHeader from '../components/AppHeader';
import {AirbnbRating} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import RatingCard from '../components/RatingCard';

const CharacterReports = ({route, navigation}) => {
  return (
    <View style={{flex: 1}}>
      <AppHeader
        navigation={() => {
          navigation.navigate(
            route.params.userType == 'officer'
              ? 'OfficerBottomTab'
              : 'HomeBottomTab',
          );
        }}
        title={'Character Reports'}
        backgroundColor={'#7a004e'}
      />
      <View style={styles.ratingCard}>
        <Text style={{color: '#000', fontSize: 30}}>4.8/5</Text>
        <AirbnbRating
          size={30}
          //reviews={['sd']}
          reviewColor="#7a004e"
          // reviewSize={0}
          selectedColor="#942700"
          isDisabled
        />
        <Text style={{margin: 20}}>1000 Reports</Text>
      </View>
      <RatingCard />
      <RatingCard />
      <RatingCard />
    </View>
  );
};
const styles = StyleSheet.create({
  ratingCard: {
    alignItems: 'center',
    backgroundColor: '#f0f0ff',
    shadowColor: '#000',
    margin: RFValue('5'),
    borderRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});

export default CharacterReports;
