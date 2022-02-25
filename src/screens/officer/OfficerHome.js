import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import MenuButton from '../../components/home/MenuButton';

const OfficerHome = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Text>OfficerHome</Text>
      <ScrollView>
        <MenuButton
          title=" Add Fine"
          onPress={() => navigation.navigate('AddFine')}
        />
      </ScrollView>
    </View>
  );
};

export default OfficerHome;
