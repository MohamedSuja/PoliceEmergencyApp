import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import MainButton from '../../components/MainButton';
import {AuthContext} from '../../navigations/AuthProvider';
import {RFValue} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/dist/Feather';
import SetingsCard from '../../components/SetingsCard';
import Octicons from 'react-native-vector-icons/dist/Octicons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const OfficerSettings = () => {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <View style={styles.setingsHeader}>
        <Text style={styles.titleTextStyle}>App Setings</Text>
      </View>
      <SetingsCard
        title="Account"
        icon={<Feather name="user" size={40} color="#000" />}
      />
      <SetingsCard
        title="Privacy Policy"
        icon={<Feather name="lock" size={40} color="#000" />}
      />
      <SetingsCard
        title="About"
        icon={<Octicons name="question" size={40} color="#000" />}
      />

      <MainButton
        text="Sign Out"
        disabled={false}
        onPress={() => logout()}
        btnStyle={styles.btnStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#100061',
    margin: 30,
    width: SCREEN_WIDTH - 50,
    position: 'absolute',
    bottom: 0,
  },
  titleTextStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  setingsHeader: {
    backgroundColor: '#100061',
    alignItems: 'center',
    height: RFValue(70),
    paddingTop: RFValue(20),
  },
});

export default OfficerSettings;
