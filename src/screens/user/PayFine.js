import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import AppHeader from '../../components/AppHeader';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const fine = [
  {
    title: 'High Speed Driving',
    description: '85 Km/h',
    price: 'RS 2500',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPCO_k0eu1ThKSHvp2yLRejfNZq_RVK_q7IkkMyV59-dB-GuHLDG9TZJqZvauySnTYXPE&usqp=CAU',
  },
  {
    title: 'Not Waiting Helmet',
    description: 'Single Person ',
    price: 'RS 2500',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5s7BAtg2l58iBCYnT9ZnVyvTIEpbvLRW8lC7K4kOp1O1_7i0eWM9a7LH5ZQz1SLlhHEQ&usqp=CAU',
  },
];

const PayFine = ({navigation}) => {
  return (
    <View style={{flex: 1, marginBottom: 40}}>
      <AppHeader
        navigation={() => navigation.navigate('HomeBottomTab')}
        title={'Your Penalties'}
      />
      <Divider color="#000" />
      <ScrollView style={styles.scroll}>
        {fine.map((data, index) => (
          <Card
            key={index}
            containerStyle={{
              margin: 8,
              padding: 5,
              borderRadius: 10,
            }}>
            <View style={styles.menuItemStyle}>
              <BouncyCheckbox
                // onPress={checkboxValue => selectItem(food, checkboxValue)}
                // isChecked={isFoodInCart(food, cartItems)}
                iconStyle={{
                  borderColor: 'lightgray',
                  borderRadius: 0,
                }}
                fillColor="green"
              />

              <FineInfo data={data} />
              <FineImage data={data} />
            </View>
          </Card>
        ))}
      </ScrollView>

      <TouchableOpacity
        //onPress={() => setModalVisible(true)}
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
          <Text style={{color: 'white', fontSize: 20}}>12000</Text>
        </View>
      </TouchableOpacity>
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
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: '600',
  },
});
