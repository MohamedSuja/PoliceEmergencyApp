import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const MainButton = props => {
  const {text, icon, disabled, btnStyle, onPress, btnTextStyle} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.5}
      style={[styles.btnContainer, btnStyle]}>
      <Text
        style={[styles.btnText, btnTextStyle, {marginRight: icon ? 10 : 0}]}>
        {text}
      </Text>
      <Image source={icon} resizeMode="contain" style={styles.iconStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',

    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#0052fe',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 25,
  },
  iconStyle: {
    height: 20,
    width: 25,
    tintColor: 'white',
  },
});

export default MainButton;
