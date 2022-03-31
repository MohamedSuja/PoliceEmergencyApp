import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Divider, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {Button, TextInput, TouchableRipple} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import AddNewCardModal from '../../components/AddFine/AddNewCardModal';

const WindowWidth = Dimensions.get('window').width;

const PaymentCard = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBar
        backgroundColor={'#fff'}
        barStyle="dark-content"
        translucent={false}
      />
      <Header
        leftContainerStyle={{marginLeft: 5}}
        backgroundColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate('PayFine')}>
            <Icon name="arrow-back-ios" size={30} color="grey" />
          </TouchableOpacity>
        }
        centerComponent={
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{'Payment'}</Text>
          </View>
        }
      />
      <Divider width={0.7} style={{width: '100%'}} />
      <View
        style={{
          padding: 10,
          flex: 1,
          justifyContent: 'space-between',
          marginBottom: RFValue('45'),
        }}>
        <View>
          <View style={styles.card1}>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'space-between',
              }}>
              <Image
                source={require('../../assets/icon/visa.png')}
                style={styles.visa}
              />
              <TouchableOpacity>
                <Entypo name="dots-three-vertical" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardText1}>4567 5678 7600 4560</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
              }}>
              <View>
                <Text style={styles.cardText2}>Cardholder Name</Text>
                <Text style={styles.cardText2}>Joon Kater</Text>
              </View>
              <View>
                <Text style={styles.cardText2}>Expir Date</Text>
                <Text style={styles.cardText2}>10/22</Text>
              </View>
            </View>
          </View>
          <TouchableRipple
            style={styles.card2}
            onPress={() => setModalVisible(true)}>
            <View style={{alignItems: 'center'}}>
              <FontAwesome5
                name="credit-card"
                size={RFValue('35')}
                color="#555466"
              />
              <Text style={{fontSize: RFValue('20'), marginTop: 10}}>
                Add New Card
              </Text>
            </View>
          </TouchableRipple>
        </View>
        <Button
          style={{
            backgroundColor: '#0a67fc',
            height: RFValue('60'),
            justifyContent: 'center',
          }}
          mode="contained"
          onPress={() => alert('Payment Successful')}>
          <Text style={{fontSize: 20}}>Pay</Text>
        </Button>
      </View>

      <AddNewCardModal
        modalVisible={modalVisible}
        modalClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  teat1: {
    fontSize: RFValue('17'),
    color: '#000',
    fontWeight: '600',
  },
  textInput1: {
    fontSize: RFValue('17'),
    backgroundColor: '#fff',
  },
  card1: {
    backgroundColor: '#0a67fc',
    height: RFValue('180'),
    justifyContent: 'space-between',
    borderRadius: 5,
    marginBottom: 10,
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

    //shadow
  },
  card2: {
    backgroundColor: '#f3f2ff',
    height: RFValue('180'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

    //shadow
  },
  pay1: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  visa: {
    height: 40,
    width: 60,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  cardText1: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 15,
    fontSize: RFValue('20'),
  },
  cardText2: {
    color: '#fff',
    marginLeft: 15,
    fontSize: RFValue('16'),
  },
});

export default PaymentCard;
