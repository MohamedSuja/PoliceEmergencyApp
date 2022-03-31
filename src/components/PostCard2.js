import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import React from 'react';
import {Card, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import moment from 'moment';

const ImageScreenWidth = Dimensions.get('window').width;

const PostCard2 = props => {
  const {
    Title,
    Subject,
    date,
    ImageFiles,
    ifAdmin,
    navigation,
    indexData,
    inform,
    docId,
    navi,
    deleteCard,
    postPrivacy,
    information,
    admin,
  } = props;

  const naviToView = i => {
    navigation.navigate('NewsView', {
      indexData: indexData,
      Title: Title,
      Subject: Subject,
      date: date,
      ImageFiles: ImageFiles,
      ifAdmin: ifAdmin,
      docId: docId,
      navi: navi,
      postPrivacy: postPrivacy,
      information: information,
      admin: admin,
    });
  };

  return (
    <Card>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{Title}</Text>
      <Text>{moment(date.toDate()).fromNow()}</Text>
      <Divider style={{height: 10, marginBottom: 10}} />
      <Text numberOfLines={3} style={{flexShrink: 1}}>
        {Subject}
      </Text>
      <TouchableOpacity onPress={() => naviToView()}>
        <Text style={{fontWeight: 'bold', color: '#000'}}> SeeMore</Text>
      </TouchableOpacity>
      {/*  ///Image fb Card */}

      <View
        style={{
          flexWrap: 'wrap',
          alignContent: 'stretch',
          marginTop: 10,
          //height: 310,
        }}>
        {ImageFiles != null ? (
          <TouchableOpacity onPress={() => naviToView()} activeOpacity={0.9}>
            <Image
              style={{
                width: '100%',
                height: 304,
                marginTop: 4,
                resizeMode: 'cover',
              }}
              source={{
                uri: ImageFiles,
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <Divider style={{height: 10, marginBottom: 10}} />
      <View
        style={{
          width: '100%',
          justifyContent: ifAdmin ? 'space-between' : 'center',
          flexDirection: 'row',
        }}>
        {/*  {ifAdmin ? (
          <TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="mode-edit" size={30} color="#535454" />
              <Text> Edit Recod</Text>
            </View>
          </TouchableOpacity>
        ) : null} */}
        {ifAdmin ? (
          <TouchableOpacity onPress={deleteCard}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="delete-outline" size={30} color="#535454" />
              <Text> Delete</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </Card>
  );
};

export default PostCard2;
