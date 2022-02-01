import React, {useContext, useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {AuthContext} from '../../navigations/AuthProvider';
import {Picker} from '@react-native-picker/picker';
import {Header} from 'react-native-elements';
import SelectView from './VerfyAccountPages/SelectView';
import IdFront from './VerfyAccountPages/IdFront';
import IdBack from './VerfyAccountPages/IdBack';

const ScreenWidth = Dimensions.get('window').width;

const VerifyAccount = () => {
  const {setUser} = useContext(AuthContext);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
      <Header />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        <SelectView />
        <IdFront />
        <IdBack />
      </ScrollView>
    </View>
  );
};

export default VerifyAccount;
