import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AppHeader from '../components/AppHeader';
import {AirbnbRating} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import RatingCard from '../components/RatingCard';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigations/AuthProvider';

const CharacterReports = ({route, navigation}) => {
  const {userData} = useContext(AuthContext);
  const [ratingDat, setRatingData] = useState([]);
  const {ratingData, userType} = route.params;
  /* ///fire base
  const getData = async () => {
    var list = [];
    var snapshot = await firestore()
      .collection('userRating')

      .where('idNo', '==', userData.idNo)

      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setRatingData(list);
  };

  //endfirbase */

  const totalRating = ratingData
    .map(item => Number(item.rating))
    .reduce((prev, curr) => prev + curr, 0);

  const avrageRating = totalRating / ratingData.length;

  useEffect(() => {
    //getData();
  }, []);

  return (
    <View style={{flex: 1, marginBottom: 50}}>
      <AppHeader
        navigation={() => {
          navigation.navigate(
            userType == 'officer' ? 'OfficerBottomTab' : 'HomeBottomTab',
          );
        }}
        title={'Character Reports'}
        backgroundColor={'#7a004e'}
      />
      <View style={styles.ratingCard}>
        <Text style={{color: '#000', fontSize: 30}}>
          {avrageRating.toPrecision(2)}/5
        </Text>
        <AirbnbRating
          size={30}
          //reviews={['sd']}
          reviewColor="#7a004e"
          // reviewSize={0}
          selectedColor="#942700"
          isDisabled
          defaultRating={avrageRating.toPrecision(1)}
        />
        <Text style={{margin: 20}}>{ratingData.length} Reports</Text>
      </View>
      <ScrollView>
        {ratingData.map((item, index) => (
          <RatingCard
            key={index}
            report={item.report}
            rating={item.rating}
            name={item.officerName}
            date={item.date}
          />
        ))}
      </ScrollView>
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
