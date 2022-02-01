import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import AnimatedLottieView from 'lottie-react-native';
import {AuthContext} from '../../../navigations/AuthProvider';

const ScreenWidth = Dimensions.get('window').width;

const IdBack = () => {
  const {setUser} = useContext(AuthContext);

  return (
    <View style={{flex: 1, alignItems: 'center', width: ScreenWidth}}>
      <Text style={{fontWeight: '800', fontSize: 20, marginTop: 20}}>
        Please Scan Your Id Back Side
      </Text>
      <AnimatedLottieView
        style={{height: 300, alignSelf: 'center'}}
        source={require('../../../assets/animation/id-card-ui-animation.json')}
        autoPlay
        speed={0.5}
        loop={true}
      />
      <TouchableOpacity
        onPress={() => setUser(true)}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}>
        <Icon name="check" size={60} color="#2e12e3" />
      </TouchableOpacity>
    </View>
  );
};

export default IdBack;
