import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import AnimatedLottieView from 'lottie-react-native';

const ScreenWidth = Dimensions.get('window').width;

const IdFront = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', width: ScreenWidth}}>
      <Text style={{fontWeight: '800', fontSize: 20, marginTop: 20}}>
        Please Scan Your Id Front Side
      </Text>
      <AnimatedLottieView
        style={{height: 300, alignSelf: 'center'}}
        source={require('../../../assets/animation/id-card-ui-animation.json')}
        autoPlay
        speed={0.5}
        loop={true}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}>
        <Icon name="chevron-with-circle-right" size={60} color="#2e12e3" />
      </TouchableOpacity>
    </View>
  );
};

export default IdFront;
