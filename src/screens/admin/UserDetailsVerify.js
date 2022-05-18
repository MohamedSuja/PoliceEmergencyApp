import {View, Text, ScrollView, Image, StyleSheet, Modal} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import {AirbnbRating, Card, Divider} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {Picker} from '@react-native-picker/picker';
import {Button, TouchableRipple} from 'react-native-paper';
import RatingCard from '../../components/RatingCard';
import MenuButton from '../../components/home/MenuButton';
import {AuthContext} from '../../navigations/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../components/LoadingModal';

const UserDetailsVerify = ({route, navigation}) => {
  const {itemData} = route.params;
  const [selectUserType, setSelectUserType] = useState('public');
  const [loading, setLoading] = useState(false);
  const [mainLoading, setMainLoading] = useState(true);
  const {user} = useContext(AuthContext);
  const [ratingData, setRatingData] = useState([]);
  const [userVerefyData, setUserVerfiyData] = useState();

  ///firbase
  const getData = async idNo => {
    var list = [];
    var snapshot = await firestore()
      .collection('userRating')
      .where('idNo', '==', idNo)
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      //console.log({...item, docId: doc.id});
    });

    setRatingData(list);
    getVerifyData();
  };

  const updateUserType = async id => {
    setLoading(true);
    await firestore()
      .collection('user')
      .doc(id)
      .update({
        promote: selectUserType,
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        console.log('User updated!');
      });
  };

  const getVerifyData = () => {
    firestore()
      .collection('verify')
      .doc(itemData.userId)
      .get()
      .then(querySnapshot => {
        // console.log(querySnapshot.data());

        querySnapshot.data()
          ? setUserVerfiyData(querySnapshot.data())
          : console.log('false');
        setMainLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };
  ///endFirbase

  useEffect(() => {
    console.log(itemData);
    getData(itemData.idNo);
  }, []);

  const totalRating = ratingData
    .map(item => Number(item.rating))
    .reduce((prev, curr) => prev + curr, 0);

  const avrageRating = totalRating / ratingData.length;

  return (
    <View style={{flex: 1}}>
      <AppHeader
        title="User Details"
        backgroundColor={'#0a67fc'}
        navigation={() => navigation.navigate('ShowUser')}
      />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                itemData.promote == 'officer'
                  ? 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fsecurity-man.png?alt=media&token=09d6333e-2b0c-4bec-a455-7a5cec874e92'
                  : 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fprofile.png?alt=media&token=3f39996d-91a9-44bd-9275-6fc421e8d9f4',
            }}
            style={styles.profileImageStyle}
            resizeMode="cover"
          />
          <View style={{marginLeft: 20}}>
            <Text style={styles.profileName}>
              {itemData.firstName + ' ' + itemData.lastName}
            </Text>
            <Text style={styles.profileId}>{itemData.idNo}</Text>
          </View>
          {userVerefyData ? (
            userVerefyData.verify ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 30,
                  right: 10,
                  zIndex: 999,
                }}>
                <Image
                  source={require('../../assets/icon/verify.png')}
                  style={{height: 50, width: 50}}
                />
                <Text
                  style={{color: '#000', fontWeight: 'bold', marginLeft: 7}}>
                  Verified
                </Text>
              </View>
            ) : null
          ) : null}
        </View>
        <Card
          containerStyle={{
            backgroundColor: 'rgba(257,257,257,0.8)',
            borderRadius: 6,
            padding: 2,
            margin: 7,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text>ID Type</Text>
            <View
              style={{
                width: RFValue('120'),
                borderRadius: 5,
              }}>
              <Picker
                selectedValue={selectUserType}
                mode="dialog"
                onValueChange={itemValue => setSelectUserType(itemValue)}>
                <Picker.Item label="Public" value="public" />
                <Picker.Item label="Officer" value="officer" />
              </Picker>
            </View>
          </View>
        </Card>
        <MenuButton
          title="Verefy ID Card"
          icon={require('../../assets/icon/correct.png')}
          onPress={() =>
            navigation.navigate('Idview', {
              userVerefyData: userVerefyData,
              userData: itemData,
            })
          }
        />
        {ratingData.length != 0 ? (
          <View>
            <View style={styles.ratingCard}>
              <View style={{marginRight: 20}}>
                <AirbnbRating
                  size={30}
                  //reviews={['sd']}
                  reviewColor="#7a004e"
                  // reviewSize={0}
                  selectedColor="#942700"
                  isDisabled
                  defaultRating={avrageRating.toPrecision(1)}
                />
              </View>
              <Text style={{color: '#000', fontSize: 30}}>
                {avrageRating.toPrecision(2)}/5{' '}
              </Text>
            </View>
            <Text style={{margin: 20, alignSelf: 'center'}}>
              {ratingData.length} Reports
            </Text>
            <View>
              {ratingData.map((item, index) => (
                <RatingCard
                  key={index}
                  report={item.report}
                  rating={item.rating}
                  name={item.officerName}
                  date={item.date}
                />
              ))}
            </View>
          </View>
        ) : null}

        <Divider width={100} />
      </ScrollView>
      <Button
        style={styles.saveBtn}
        labelStyle={{fontSize: RFValue(18)}}
        loading={loading}
        mode="contained"
        onPress={() => updateUserType(itemData.userId)}>
        Save
      </Button>

      <LoadingModal visible={mainLoading} transparent={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageStyle: {
    height: 100,
    width: 100,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 2,
  },
  imageContainer: {flexDirection: 'row', alignItems: 'center'},
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  profileId: {color: '#000'},
  saveBtn: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 350,
  },
  ratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
export default UserDetailsVerify;
