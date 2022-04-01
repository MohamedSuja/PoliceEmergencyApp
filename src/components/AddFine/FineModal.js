import {
  View,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MainButton from '../MainButton';
import {RFValue} from 'react-native-responsive-fontsize';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {AuthContext} from '../../navigations/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const fine = [
  {
    fineName: 'High Speed Driving',
    fineRs: 2000,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPCO_k0eu1ThKSHvp2yLRejfNZq_RVK_q7IkkMyV59-dB-GuHLDG9TZJqZvauySnTYXPE&usqp=CAU',
  },
  {
    fineName: 'Not Wearing Helmet',
    fineRs: 2500,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5s7BAtg2l58iBCYnT9ZnVyvTIEpbvLRW8lC7K4kOp1O1_7i0eWM9a7LH5ZQz1SLlhHEQ&usqp=CAU',
  },
  {
    fineName: 'Passing lanes open!',
    fineRs: 1000,
    imageUrl:
      'https://qph.fs.quoracdn.net/main-qimg-808df08e3f160822c3e6c3ba717d6114.webp',
  },
  {
    fineName: 'Cross double line',
    fineRs: 2000,
    imageUrl:
      'https://www.driverknowledgetests.com/resources/wp-content/uploads/2014/08/double-white-line-straight-road.jpg',
  },
];

const FineModal = props => {
  const {btnPress, modalVisible, closeBtn, chacked, listData} = props;
  const mark = data => Boolean(listData.find(item => item.title == data.title));

  const [loading, setLoading] = useState(true);
  const [fineData, setFineData] = useState([]);

  ///firebase
  const getData = async () => {
    var list = [];
    var snapshot = await firestore()
      .collection('fineList')
      .orderBy('fineName', 'asc')
      .get();

    snapshot.forEach(doc => {
      const item = doc.data();
      list.push({...item, docId: doc.id});
      console.log({...item, docId: doc.id});
    });

    setFineData(list);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);

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
          paddingTop: RFValue('30'),
          paddingLeft: RFValue('10'),
          paddingRight: RFValue('10'),
          paddingBottom: RFValue('55'),
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
            {fineData.map((data, index) => (
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
    <Text style={styles.titleStyle}>{props.data.firstName}</Text>
    <Text style={{color: 'red'}}>{props.data.fineRs} Rs</Text>
  </View>
);

const FineImage = props => (
  <View>
    <Image
      source={{
        uri:
          props.data.imageUrl == null
            ? 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2FScreenshot%202022-04-01%20231438.jpg?alt=media&token=974faa17-2ffa-432d-83d8-0ac6804e1994'
            : props.data.imageUrl,
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
