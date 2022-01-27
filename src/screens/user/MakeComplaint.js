import {
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MainButton from '../../components/MainButton';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {Image} from 'react-native';

const MakeComplaint = ({navigation}) => {
  const ImageUrls = [
    {
      localUrl:
        'https://eh9ti3qk8yf3m8xqr5gt2fp4-wpengine.netdna-ssl.com/wp-content/uploads/2021/06/25470872_web1_210525-ABB-traffic-collisions-crash_3-768x512.jpg',
    },
    {
      localUrl:
        'https://www.dailynews.lk/sites/default/files/news/2017/04/12/z_p01-Five-killed.jpg',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <Header
        leftContainerStyle={{marginLeft: 5}}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back-ios" size={30} color="#fff" />
          </TouchableOpacity>
        }
        centerComponent={
          <Text
            style={{
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 20,
            }}>
            Make A Complaint
          </Text>
        }
      />
      <StatusBar barStyle="light-content" />
      <ScrollView
        nestedScrollEnabled
        style={{padding: 20, marginTop: 30, height: '100%', marginBottom: 0}}>
        <TextInput
          placeholder="Complaint Title"
          style={{borderColor: 'black', borderWidth: 2}}
        />
        <TextInput
          multiline
          numberOfLines={50}
          placeholder="Complaint"
          style={{
            borderColor: 'black',
            borderWidth: 2,
            marginTop: 20,
            height: 400,
            textAlignVertical: 'top',
          }}
        />

        <ScrollView horizontal style={{marginTop: 15}}>
          {ImageUrls.map((item, index) => (
            <View
              key={index}
              style={{
                height: 110,
                width: 110,
                backgroundColor: 'grey',
                margin: 5,
              }}>
              <Image
                style={{
                  height: '100%',
                  width: 110,
                  resizeMode: 'contain',
                }}
                source={{uri: item.localUrl}}
              />
            </View>
          ))}

          <View
            style={{
              height: 110,
              width: 110,

              margin: 5,
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Image
                style={{
                  height: '100%',
                  width: 100,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/icon/photo.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <MainButton text="Submit" btnStyle={{margin: 10}} />
      </ScrollView>
    </View>
  );
};

export default MakeComplaint;
