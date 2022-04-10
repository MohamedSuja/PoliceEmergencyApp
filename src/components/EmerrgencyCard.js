import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Button, TouchableRipple} from 'react-native-paper';
import moment from 'moment';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';

const SCREEN_WIDTH = Dimensions.get('window').width;

const EmerrgencyCard = props => {
  const test = () => {
    console.log('test');
  };

  const {
    onPressView,
    onPressShare,
    time,
    emergency,
    request,
    discription,
    onPressDel,
    viewed,
    admin,
  } = props;
  return (
    <ListItem.Swipeable
      disabled
      bottomDivider
      leftContent={
        <View style={{flexDirection: 'row', width: 190, height: '100%'}}>
          <TouchableRipple
            onPress={onPressView}
            style={{
              backgroundColor: '#00450e',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 5,
              borderRadius: 5,
            }}>
            <View style={{alignItems: 'center'}}>
              <Entypo name="location" color={'#fff'} size={40} />
              <Text style={{fontWeight: '800', color: '#fff'}}>Distance</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={onPressShare}
            style={{
              backgroundColor: '#44017a',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 5,
              borderRadius: 5,
            }}>
            <View style={{alignItems: 'center'}}>
              <Entypo name="location-pin" color={'#fff'} size={40} />
              <Text style={{fontWeight: '600', color: '#fff'}}>Share</Text>
            </View>
          </TouchableRipple>
        </View>
      }
      rightContent={
        admin ? (
          <TouchableRipple
            onPress={onPressDel}
            style={{
              backgroundColor: 'red',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 5,
              borderRadius: 5,
              marginLeft: 70,
            }}>
            <View style={{alignItems: 'center'}}>
              <Icon name="delete" color={'#fff'} size={40} />
              <Text style={{fontWeight: '800', color: '#fff'}}>Distance</Text>
            </View>
          </TouchableRipple>
        ) : null
      }
      rightWidth={200}
      rightStyle={{zIndex: 999}}
      containerStyle={{
        padding: 0,
        justifyContent: 'center',
      }}>
      <ListItem.Content>
        <LinearGradient
          colors={
            viewed ? ['#8EC5FC', '#E0C3FC'] : ['#DD5E89', '#F7BB97', '#DD5E89']
          }
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          style={styles.linearGradient}>
          <Text style={{alignSelf: 'baseline', color: '#000', marginLeft: 5}}>
            {moment(time.toDate()).fromNow()}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: 'red'}}>
            {emergency}
          </Text>
          <TouchableOpacity onPress={() => console.log('dsfhj')}>
            <Text style={{fontWeight: '900'}}>Request For : {request}</Text>
          </TouchableOpacity>
          {discription ? (
            <Text style={{color: '#000'}}>{discription}</Text>
          ) : null}

          {/* <View style={{flexDirection: 'row'}}>
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
        </View> */}
        </LinearGradient>
      </ListItem.Content>

      {/*    <ListItem.Chevron /> */}
    </ListItem.Swipeable>
  );
};

var styles = StyleSheet.create({
  linearGradient: {
    width: SCREEN_WIDTH - 15,
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
