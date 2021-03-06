import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import AppHeader from '../../components/AppHeader';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../components/LoadingModal';

const PayFine = ({navigation}) => {
  const [myFine, setMyFine] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const onRefresh = () => {
    setIsFetching(true);
    getData();
  };

  const r = () => <ActivityIndicator size={'large'} style={{marginTop: 200}} />;

  const total = myFine
    .map(item => Number(item.price))
    .reduce((prev, curr) => prev + curr, 0);

  const getData = () => {
    firestore()
      .collection('fine')
      .doc('1')
      .get()
      .then(querySnapshot => {
        // console.log(querySnapshot.data());
        setMyFine(querySnapshot.data().Fine);
        setTimeout(() => {
          setIsFetching(false);
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    let unmounted = false;
    console.log('Running effect to fetch data');

    setTimeout(() => {
      console.log('Data loaded for page');

      if (!unmounted) {
        getData();
      }
    }, 500);

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <View style={{flex: 1, marginBottom: 40}}>
      <AppHeader
        navigation={() => navigation.navigate('HomeBottomTab')}
        title={'Your Penalties'}
        backgroundColor={'#0052fe'}
      />
      <Divider color="#000" />
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }>
        {myFine.map((data, index) => (
          <Card
            key={index}
            containerStyle={{
              margin: 8,
              padding: 5,
              borderRadius: 10,
            }}>
            <View style={styles.menuItemStyle}>
              <FineInfo data={data} />
              <FineImage data={data} />
            </View>
          </Card>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('PaymentCard')}
        activeOpacity={0.7}
        style={{
          flex: 1,
          position: 'absolute',
          backgroundColor: 'rgba(66, 0, 2, .8)',
          borderRadius: 30,
          alignSelf: 'center',
          bottom: 50,
          zIndex: 999,
          width: 300,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 10,
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontSize: 20, marginRight: 40}}>
            PayFine
          </Text>
          <Text style={{color: 'white', fontSize: 20}}>{total + ' Rs'}</Text>
        </View>
      </TouchableOpacity>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default PayFine;

const FineInfo = props => (
  <View style={{width: 200, justifyContent: 'space-evenly'}}>
    <Text style={styles.titleStyle}>{props.data.title}</Text>
    <Text>{props.data.description}</Text>
    <Text>{props.data.price}</Text>
  </View>
);

const FineImage = props => (
  <View>
    <Image
      source={{
        uri: props.data.image,
      }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  penaltiCard: {
    margin: 5,
  },
  scroll: {},
  menuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: '600',
  },
});
