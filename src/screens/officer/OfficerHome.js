import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MenuButton from '../../components/home/MenuButton';
import {Avatar, Badge, Divider} from 'react-native-elements';
import AnimatedHeader from '../../components/AnimatedHeader';

const OfficerHome = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      {/* Header */}

      {/* End Header */}
      <ScrollView>
        <AnimatedHeader />
        <MenuButton
          title=" Add Fine"
          icon={require('../../assets/icon/referee.png')}
          onPress={() => navigation.navigate('AddFine')}
        />
      </ScrollView>
    </View>
  );
};

export default OfficerHome;
