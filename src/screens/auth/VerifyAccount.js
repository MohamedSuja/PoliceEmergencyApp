import React, {useContext} from 'react';
import {View, Text, Dimensions} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {AuthContext} from '../../navigations/AuthProvider';

const ScreenHight = Dimensions.get('window').height;

const VerifyAccount = () => {
  const {setUser} = useContext(AuthContext);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>Please Scan Your Id Card Or Driving Licence</Text>
      <AnimatedLottieView
        style={{height: 300, alignSelf: 'center'}}
        source={require('../../assets/animation/identity-verification-pending.json')}
        autoPlay
        speed={0.6}
        loop={true}
      />
    </View>
  );
};

export default VerifyAccount;
