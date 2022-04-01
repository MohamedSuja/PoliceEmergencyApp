import {View, Text} from 'react-native';
import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import Feather from 'react-native-vector-icons/dist/Feather';

const SetingsCard = props => {
  const {icon, title, onPress} = props;
  return (
    <TouchableRipple onPress={onPress}>
      <View style={{marginLeft: 25, marginRight: 25}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            padding: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {icon}

            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                color: '#000',
                marginLeft: 15,
              }}>
              {title}
            </Text>
          </View>

          <Feather name="chevron-right" size={40} color="#000" />
        </View>
        <Divider
          width={1}
          style={{height: 10, width: '100%', alignSelf: 'center'}}
        />
      </View>
    </TouchableRipple>
  );
};

export default SetingsCard;
