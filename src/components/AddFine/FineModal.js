import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import MainButton from '../MainButton';
import {RFValue} from 'react-native-responsive-fontsize';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {AuthContext} from '../../navigations/AuthProvider';

const fine = [
  {
    title: 'High Speed Driving',
    price: 2000,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPCO_k0eu1ThKSHvp2yLRejfNZq_RVK_q7IkkMyV59-dB-GuHLDG9TZJqZvauySnTYXPE&usqp=CAU',
  },
  {
    title: 'Not Wearing Helmet',
    price: 2500,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5s7BAtg2l58iBCYnT9ZnVyvTIEpbvLRW8lC7K4kOp1O1_7i0eWM9a7LH5ZQz1SLlhHEQ&usqp=CAU',
  },
  {
    title: 'Passing lanes open!',
    price: 1000,
    image:
      'https://qph.fs.quoracdn.net/main-qimg-808df08e3f160822c3e6c3ba717d6114.webp',
  },
  {
    title: 'Cross double line',
    price: 2000,
    image:
      'https://www.driverknowledgetests.com/resources/wp-content/uploads/2014/08/double-white-line-straight-road.jpg',
  },
];

const FineModal = props => {
  const {btnPress, modalVisible, closeBtn, chacked, listData} = props;
  const mark = data => Boolean(listData.find(item => item.title == data.title));

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      visible={modalVisible}
      transparent={true}
      //  onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0,0.4)',
          paddingTop: 40,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 30,
        }}>
        <View style={{flex: 1, backgroundColor: '#fff', borderRadius: 10}}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 25,
              fontWeight: '800',
              marginTop: 10,
            }}>
            Fine List
          </Text>
          <TouchableOpacity
            onPress={closeBtn}
            style={{
              position: 'absolute',
              right: 0,
              margin: 4,
            }}>
            <Icon name="closesquareo" size={40} color="#0052fe" />
          </TouchableOpacity>

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
                    onPress={checkboxValue => chacked(data, checkboxValue)}
                    isChecked={mark(data)}
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
          <View
            style={{
              margin: 10,
              position: 'absolute',
              width: RFValue(330),
              bottom: 0,
              alignSelf: 'center',
            }}>
            {/* //! TEST  onPress={btnPress} */}
            {/*   <MainButton text="Add to query" onPress={btnPress} /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default FineModal;

const FineInfo = props => (
  <View style={{width: 200, justifyContent: 'space-evenly'}}>
    <Text style={styles.titleStyle}>{props.data.title}</Text>
    <Text style={{color: 'red'}}>{props.data.price} Rs</Text>
  </View>
);

const FineImage = props => (
  <View>
    <Image
      source={{
        uri: props.data.image,
      }}
      style={{
        width: 70,
        height: 70,
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
  scroll: {
    padding: 10,
    marginBottom: 70,
  },
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
