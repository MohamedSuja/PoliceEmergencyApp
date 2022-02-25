import {View, Text} from 'react-native';
import React from 'react';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {TouchableRipple} from 'react-native-paper';

const SlideList = ({onPress, text, subText}) => {
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
            paddingTop: 5,
          }}>
          <Icon name="delete" color={'#fff'} size={40} />
        </TouchableRipple>
      }>
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: 'bold', fontSize: 18}}>
          {text}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{
            position: 'absolute',
            right: 0,
            color: 'red',
            fontWeight: 'bold',
          }}>
          {subText} Rs
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};

export default SlideList;
