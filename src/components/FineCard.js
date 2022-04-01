import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {Card, ListItem} from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const FineCard = props => {
  const {data, onPress} = props;
  return (
    <ListItem.Swipeable
      bottomDivider
      leftContent={
        <TouchableRipple
          onPress={onPress}
          style={{
            backgroundColor: 'red',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="delete" color={'#fff'} size={40} />
        </TouchableRipple>
      }
      topDivider
      containerStyle={{padding: 4, backgroundColor: '#f0f0ff'}}>
      <ListItem.Content>
        <View style={styles.menuItemStyle}>
          <FineInfo data={data} />
          <FineImage data={data} />
        </View>
      </ListItem.Content>
      <ListItem.Chevron color={'#000'} />
    </ListItem.Swipeable>
  );
};

export default FineCard;

const FineInfo = props => (
  <View style={{justifyContent: 'space-evenly', marginLeft: 10}}>
    <Text style={styles.titleStyle}>{props.data.fineName}</Text>
    <Text style={{color: 'red'}}>{props.data.fineRs} Rs</Text>
  </View>
);

const FineImage = props => (
  <View>
    <Image
      source={{
        uri:
          props.data.imageUrl == null
            ? 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2FScreenshot%202022-04-01%20231438.jpg?alt=media&token=974faa17-2ffa-432d-83d8-0ac6804e1994'
            : props.data.imageUrl,
      }}
      style={{
        width: 70,
        height: 70,
        borderRadius: 8,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  penaltiCard: {
    margin: 5,
  },
  scroll: {
    padding: 10,
    marginBottom: 70,
  },
  menuItemStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: '600',
  },
});
