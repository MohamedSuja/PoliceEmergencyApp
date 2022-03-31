import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import {Divider, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const WindowWidth = Dimensions.get('window').width;

const AddNewCardModal = props => {
  const {modalVisible, modalClose} = props;
  return (
    <Modal visible={modalVisible} statusBarTranslucent animationType="slide">
      <Header
        leftContainerStyle={{marginLeft: 5, marginTop: RFValue('10')}}
        backgroundColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={modalClose}>
            <Icon name="arrow-back-ios" size={30} color="grey" />
          </TouchableOpacity>
        }
        centerComponent={
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                width: '100%',
              }}>
              {'Provide Card Information'}
            </Text>
          </View>
        }
        centerContainerStyle={{marginTop: RFValue('10')}}
      />
      <Divider width={0.7} style={{width: '100%'}} />
      <View
        style={{
          padding: RFValue('10'),
          height: RFValue('550'),
          backgroundColor: 'rgba(0,0,0,0.05)',
        }}>
        <View style={styles.card1}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome5 name="credit-card" size={40} color="#ff0000" />
            <Text
              style={{
                fontSize: RFValue('19'),
                marginLeft: 20,
                color: '#000',
                fontWeight: '800',
              }}>
              Add New Card
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: RFValue('8'),
              marginLeft: RFValue('10'),
            }}>
            <Image
              source={require('../../assets/icon/002-mastercard.png')}
              style={styles.pay1}
            />
            <Image
              source={require('../../assets/icon/003-american-express.png')}
              style={styles.pay1}
            />
            <Image
              source={require('../../assets/icon/004-visa.png')}
              style={styles.pay1}
            />
            <Image
              source={require('../../assets/icon/013-hsbc.png')}
              style={styles.pay1}
            />
            <Image
              source={require('../../assets/icon/022-maestro.png')}
              style={styles.pay1}
            />
          </View>
        </View>

        <Text style={styles.teat1}>CARD NUMBER</Text>
        <TextInput
          style={styles.textInput1}
          mode="outlined"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          keyboardType="number-pad"
        />
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View>
            <Text style={styles.teat1}>EXPIRES</Text>
            <TextInput
              mode="outlined"
              placeholder="MM / DD"
              style={styles.textInput1}
              keyboardType="number-pad"
            />
          </View>
          <View style={{marginLeft: 25}}>
            <Text style={styles.teat1}>CVV</Text>
            <TextInput
              mode="outlined"
              placeholder="***"
              style={styles.textInput1}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <Text style={[styles.teat1, {marginTop: 20}]}>CARDHOLDER NAME</Text>
        <TextInput
          mode="outlined"
          placeholder="Full Name"
          style={styles.textInput1}
        />
      </View>
      <Button
        mode="contained"
        style={{
          margin: 10,
          marginTop: 10,
          height: RFValue('50'),
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 22}}>Add New Card</Text>
      </Button>
    </Modal>
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
    backgroundColor: '#fff',
    padding: RFValue('15'),
    borderRadius: 10,
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
});

export default AddNewCardModal;
