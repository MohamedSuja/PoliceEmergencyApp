import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {Avatar, Divider, Header} from 'react-native-elements';
import {AuthContext} from '../../navigations/AuthProvider';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import moment from 'moment';
import LocationPicker from '../../components/LocationPicker';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import LoadingModal from '../../components/LoadingModal';

const WindowWidth = Dimensions.get('window').width;

const NewsView = ({route, navigation}) => {
  const {user, userIdNo} = useContext(AuthContext);
  const {
    Title,
    Subject,
    date,
    ImageFiles,
    ifAdmin,
    indexData,
    docId,
    navi,
    postPrivacy,
    information,
    admin,
  } = route.params;
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const inform = async id => {
    setLoading(true);
    await firestore()
      .collection('post')
      .doc(id)
      .update({
        information: [
          ...information,
          {
            info: info,
            postUser: ifAdmin ? 'Officer' : 'Public',
          },
        ],
      })
      .then(() => {
        setLoading(false);
        admin
          ? navigation.navigate('ViewAllPosts')
          : alert('Your data recorded');
      });
  };

  return (
    <View style={{alignItems: 'center', flex: 1, marginBottom: RFValue('50')}}>
      <StatusBar
        backgroundColor={'#fff'}
        barStyle="dark-content"
        translucent={false}
      />
      <Header
        leftContainerStyle={{marginLeft: 5}}
        backgroundColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate(navi)}>
            <Icon name="arrow-back-ios" size={30} color="grey" />
          </TouchableOpacity>
        }
        centerComponent={
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{Title}</Text>
            <Text> {moment(date.toDate()).fromNow()}</Text>
          </View>
        }
      />
      <Divider
        width={1}
        style={{height: 10, width: WindowWidth - 100, marginBottom: 10}}
      />

      <ScrollView style={{marginTop: 10}}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={RFValue('120')}
          behavior="position">
          <View style={{alignItems: 'center'}}>
            <Text numberOfLines={50} style={{flexShrink: 1}}>
              {Subject}
            </Text>

            <Divider width={1} style={{width: WindowWidth - 100, margin: 10}} />

            {ImageFiles ? (
              <Image
                style={{
                  height: 300,
                  width: WindowWidth,
                  resizeMode: 'contain',
                  marginTop: 10,
                  marginBottom: 10,
                }}
                source={{uri: ImageFiles}}
              />
            ) : null}

            <Divider width={1} style={{width: WindowWidth - 20}} />

            <View>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  alignSelf: 'center',
                }}
                onPress={() => console.log(Subject)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="perm-device-information"
                    size={30}
                    color="#535454"
                  />
                  <Text> Inform Us</Text>
                </View>
              </TouchableOpacity>
              {ifAdmin
                ? information.map((item, index) => (
                    <View key={index}>
                      <View
                        style={{
                          backgroundColor: '#fff',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Avatar
                          size={60}
                          containerStyle={{}}
                          avatarStyle={{borderRadius: 50, margin: 5}}
                          source={
                            item.postUser == 'Officer'
                              ? require('../../assets/icon/security-man.png')
                              : require('../../assets/icon/profile.png')
                          }
                        />
                        <View style={{marginLeft: 20}}>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: 'bold',
                              fontSize: RFValue('15'),
                            }}>
                            {item.postUser}
                          </Text>
                          <Text style={{fontSize: RFValue('13')}}>
                            {item.info}
                          </Text>
                        </View>
                      </View>
                      <Divider
                        width={1}
                        style={{
                          width: WindowWidth,
                        }}
                      />
                    </View>
                  ))
                : null}
              <View style={{flexDirection: 'row', width: '100%'}}>
                <TextInput
                  value={info}
                  onChangeText={val => setInfo(val)}
                  mode="outlined"
                  multiline
                  numberOfLines={50}
                  label="Data"
                  style={{
                    //borderColor: 'black',
                    //   borderWidth: 2,
                    width: RFValue('300'),
                    height: 130,
                    textAlignVertical: 'top',
                    borderRadius: 5,
                    margin: 5,
                  }}
                />
                <TouchableOpacity
                  onPress={() => inform(docId)}
                  style={{alignSelf: 'flex-end', margin: 10}}>
                  <FontAwesome name="send" size={30} color="#0a67fc" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <LoadingModal visible={loading} />
    </View>
  );
};

export default NewsView;
