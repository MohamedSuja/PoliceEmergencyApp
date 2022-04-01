import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import {AirbnbRating, Avatar} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import MainButton from '../../components/MainButton';

const AddUserReport = ({navigation}) => {
  const [idNo, setIdNo] = useState('');
  const [report, setReport] = useState('');
  return (
    <View>
      <AppHeader
        navigation={() => navigation.navigate('OfficerBottomTab')}
        title={'Add User Report'}
        backgroundColor={'#0052fe'}
      />
      <ScrollView>
        <TextInput
          value={idNo}
          onChangeText={val => setIdNo(val)}
          style={{margin: 10}}
          label="Id No"
          right={
            <TextInput.Icon
              name={() => <Icon name="search" size={25} />}
              onPress={() =>
                idNo ? getData() : alert('Please enter a valid ID')
              }
            />
          }
        />
        <View style={{flexDirection: 'row'}}>
          <Avatar
            size={64}
            containerStyle={{marginLeft: 10, marginRight: 15}}
            avatarStyle={{borderRadius: 15}}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fprofile.png?alt=media&token=3f39996d-91a9-44bd-9275-6fc421e8d9f4',
            }}
          />
          <View style={{marginTop: 8}}>
            <Text style={{color: '#000', fontSize: 14, fontWeight: '700'}}>
              Name
            </Text>
            <Text>Address</Text>
          </View>
        </View>
        <View style={styles.ratingCard}>
          <AirbnbRating
            size={30}
            //reviews={['sd']}
            reviewColor="#7a004e"
            // reviewSize={0}
            selectedColor="#942700"
            starContainerStyle={{marginBottom: 20}}
          />
        </View>
        <TextInput
          value={report}
          onChangeText={val => setReport(val)}
          mode="outlined"
          multiline
          numberOfLines={50}
          label="Report"
          style={{
            //borderColor: 'black',
            //   borderWidth: 2,
            margin: 5,
            height: 300,
            textAlignVertical: 'top',
            borderRadius: 5,
            backgroundColor: '#f0f0ff',

            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}
        />
        <View style={{margin: 10}}>
          <MainButton text="Submit Report" onPress={() => {}} />
        </View>
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

export default AddUserReport;
