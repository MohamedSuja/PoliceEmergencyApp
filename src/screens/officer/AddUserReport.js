import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {TextInput, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import {AirbnbRating, Avatar} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import MainButton from '../../components/MainButton';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigations/AuthProvider';
import LoadingModal from '../../components/LoadingModal';

const AddUserReport = ({navigation, route}) => {
  const [idNo, setIdNo] = useState('');
  const [report, setReport] = useState('');
  const [rating, setRating] = useState(3);
  const [publicData, setPublicData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const {userData} = route.params;
  const [loading, setLoading] = useState(false);

  //firebase
  const SendData = () => {
    setLoading(true);
    firestore()
      .collection('userRating')
      .add({
        officerName: userData.firstName + ' ' + userData.lastName,
        rating: rating,
        report: report,
        idNo: idNo,
        date: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        getRatigData(idNo);
        setLoading(false);
        alert('Added!');
      });
  };

  const getPublicData = async () => {
    var list = [];
    var snapshot = await firestore()
      .collection('user')
      .where('idNo', '==', idNo)
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setPublicData(list);
  };

  const getRatigData = async idNo => {
    setLoading(true);
    var list = [];
    var snapshot = await firestore()
      .collection('userRating')
      .where('idNo', '==', idNo)
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setRatingData(list);
    getPublicData();
    setLoading(false);
  };

  ///firebase

  const handleSent = () => {
    Alert.alert(
      'Are you sure?',
      'Add Penalty',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => SendData(),
        },
      ],
      {cancelable: false},
    );
  };

  const submitBtn = () => {
    publicData[0] ? handleSent() : alert('! Invalid User Id');
    //console.log(userData);
  };

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
                idNo ? getRatigData(idNo) : alert('Please enter a valid ID')
              }
            />
          }
        />
        {publicData[0] ? (
          <TouchableRipple
            onPress={() =>
              navigation.navigate('CharacterReports', {
                userType: userData.promote,
                ratingData: ratingData,
              })
            }>
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
                  {publicData[0].firstName + ' ' + publicData[0].lastName}
                </Text>
                <Text>{publicData[0].address}</Text>
              </View>
            </View>
          </TouchableRipple>
        ) : null}
        <View style={styles.ratingCard}>
          <AirbnbRating
            size={30}
            //reviews={['sd']}
            reviewColor="#7a004e"
            // reviewSize={0}
            onFinishRating={r => setRating(r)}
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
          <MainButton text="Submit Report" onPress={() => submitBtn()} />
        </View>
      </ScrollView>
      <LoadingModal visible={loading} transparent={true} />
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
