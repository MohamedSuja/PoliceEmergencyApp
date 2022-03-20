import {View, Text, Modal} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const LoadingModal = props => {
  const {visible, onRequestClose, transparent} = props;
  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      transparent={transparent}
      onRequestClose={onRequestClose}
      animationType="fade">
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0,0.3)',
        }}>
        <AnimatedLottieView
          style={{height: RFValue('500'), alignSelf: 'center'}}
          source={require('../assets/animation/78259-loading.json')}
          autoPlay
          speed={0.9}
          loop={true}
        />
      </View>
    </Modal>
  );
};

export default LoadingModal;
