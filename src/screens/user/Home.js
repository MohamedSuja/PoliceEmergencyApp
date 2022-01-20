import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Header} from 'react-native-elements';
import MenuButton from '../../components/home/MenuButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = () => {
  return (
    <View style={{height: '100%', marginBottom: 0}}>
      <Header centerComponent={<Text>Home</Text>} />
      <View>
        <ScrollView>
          <MenuButton
            title="News Feed"
            icon={require('../../assets/icon/newspaper.png')}
          />
          <MenuButton
            title="Make A Complaint"
            icon={require('../../assets/icon/911.png')}
          />
          <MenuButton
            title="Pay Fine"
            icon={require('../../assets/icon/referee.png')}
          />
          <MenuButton
            title="Find A Police Station"
            icon={require('../../assets/icon/map.png')}
          />
          <MenuButton
            title="Fire Service"
            icon={require('../../assets/icon/fire-truck.png')}
          />
          <MenuButton
            title=" Ambulance Service"
            icon={require('../../assets/icon/ambulance.png')}
          />
          <MenuButton
            title="Emergency"
            icon={require('../../assets/icon/alarm.png')}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
