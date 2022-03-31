import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const StationCard = props => {
  const {drectionBtn, callBtn, title, address, phone, admin, deleteData} =
    props;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {admin ? (
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 1999,
              right: RFValue('10'),
              top: RFValue('10'),
            }}
            onPress={deleteData}>
            <Icon name="delete" size={40} color="#ff1100" />
          </TouchableOpacity>
        ) : null}
        <View>
          <Text
            style={{color: '#000', fontSize: RFValue('22'), fontWeight: '800'}}>
            {title}
          </Text>
          <Text>{address}</Text>
          <Text style={{margin: 5}}>{phone}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableRipple onPress={drectionBtn} style={styles.directionBtn}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Fontisto size={25} name="map" color="#fff" />
              <Text style={styles.drectionText}>Drection</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={callBtn} style={styles.callBtn}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Foundation size={25} name="telephone" color="#0a67fc" />
              <Text style={styles.callText}>Call</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: SCREEN_WIDTH},
  card: {
    //position: 'absolute',
    backgroundColor: 'rgba(243, 242, 255,0.85)',
    height: 150,
    width: SCREEN_WIDTH - 20,
    zIndex: 999,
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 7,
    padding: RFValue('15'),

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
  directionBtn: {
    backgroundColor: '#0a67fc',
    height: RFValue('35'),
    width: RFValue('150'),
    marginRight: 12,
    alignItems: 'center',
    borderRadius: 50,
  },
  drectionText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 19,
  },
  callBtn: {
    backgroundColor: '#fff',
    height: RFValue('35'),
    width: RFValue('100'),
    alignItems: 'center',
    borderRadius: 50,
  },
  callText: {
    color: '#000',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 19,
  },
});

export default StationCard;
