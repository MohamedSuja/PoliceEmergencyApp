import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Button, TouchableRipple} from 'react-native-paper';
import moment from 'moment';

const EmerrgencyCard = props => {
  const {onPressView, onPressShare, time, emergency, request, discription} =
    props;
  return (
    <TouchableRipple>
      <LinearGradient
        colors={['#8EC5FC', '#E0C3FC']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.linearGradient}>
        <Text style={{alignSelf: 'baseline', color: '#000'}}>
          {moment(item.time.toDate()).fromNow()}
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: 'red'}}>
          {emergency}
        </Text>
        <TouchableOpacity>
          <Text style={{fontWeight: '900'}}>Request For : {request}</Text>
        </TouchableOpacity>
        {discription ? (
          <Text style={{color: '#000'}}>{discription}</Text>
        ) : null}

        <View style={{flexDirection: 'row'}}>
          <Button
            mode="contained"
            onPress={onPressView}
            style={{backgroundColor: 'rgba(0, 0, 0,0.2)', margin: 5}}>
            <Text>View Location</Text>
          </Button>
          <Button
            mode="contained"
            onPress={onPressShare}
            style={{backgroundColor: 'rgba()', margin: 5}}>
            <Text style={{color: '#000'}}>Share Location</Text>
          </Button>
        </View>
      </LinearGradient>
    </TouchableRipple>
  );
};

var styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    margin: 5,
    // height: 100,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
  },
});
export default EmerrgencyCard;
