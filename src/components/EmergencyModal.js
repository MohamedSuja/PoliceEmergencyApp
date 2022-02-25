import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const EmergencyModal = props => {
  const {onLongPress, modalVisible} = props;
  return (
    <Modal
      statusBarTranslucent
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      //  onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0,0.4)',
        }}>
        <Text
          style={{
            fontWeight: '800',
            fontSize: 20,
            alignSelf: 'center',
            color: '#fff',
          }}>
          Immediately We Take Action
        </Text>
        <TouchableOpacity activeOpacity={0.6} onLongPress={onLongPress}>
          <AnimatedLottieView
            style={{height: 300, alignSelf: 'center'}}
            source={require('../assets/animation/alert-icon-exclamation.json')}
            autoPlay
            speed={0.5}
            loop={true}
          />
          <Text style={{fontWeight: '800', fontSize: 20, alignSelf: 'center'}}>
            Long Press To Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EmergencyModal;
