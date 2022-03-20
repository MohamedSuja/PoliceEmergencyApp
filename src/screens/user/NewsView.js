import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
} from 'react-native';
import React, {useContext} from 'react';
import {Divider, Header} from 'react-native-elements';
import {AuthContext} from '../../navigations/AuthProvider';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {ScrollView} from 'react-native';

const WindowWidth = Dimensions.get('window').width;

const NewsView = ({route, navigation}) => {
  const {CardData} = useContext(AuthContext);
  const {Title, Subject, Date, ImageFiles, ifAdmin, indexData} = route.params;
  return (
    <SafeAreaView style={{alignItems: 'center', flex: 1}}>
      <StatusBar
        backgroundColor={'#fff'}
        barStyle="dark-content"
        translucent={false}
      />
      <Header
        leftContainerStyle={{marginLeft: 5}}
        backgroundColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate('NewsFeed')}>
            <Icon name="arrow-back-ios" size={30} color="grey" />
          </TouchableOpacity>
        }
        centerComponent={
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{Title}</Text>
            <Text> {Date}</Text>
          </View>
        }
      />

      <Divider
        width={1}
        style={{height: 10, width: WindowWidth - 100, marginBottom: 10}}
      />
      <View>
        <Text numberOfLines={50} style={{flexShrink: 1}}>
          {Subject}
        </Text>
      </View>

      <Divider width={1} style={{width: WindowWidth - 100, margin: 10}} />
      <TouchableOpacity onPress={() => console.log(Subject)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="perm-device-information" size={30} color="#535454" />
          <Text> Inform Us</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={{marginTop: 10}}>
        <View style={{alignItems: 'center'}}>
          {ImageFiles ? (
            <Image
              style={{
                height: 250,
                width: WindowWidth - 10,
                resizeMode: 'contain',
                margin: 5,
              }}
              source={{uri: ImageFiles}}
            />
          ) : null}

          <Divider width={1} style={{width: WindowWidth - 20}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsView;
