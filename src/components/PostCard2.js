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

const ImageScreenWidth = Dimensions.get('window').width;

const PostCard2 = props => {
  const {Title, Subject, Date, ImageFiles, ifAdmin, navigation, indexData} =
    props;

  const naviToView = i => {
    navigation.navigate('NewsView', {
      indexData: indexData,
      Title: Title,
      Subject: Subject,
      Date: Date,
      ImageFiles: ImageFiles,
      ifAdmin: ifAdmin,
    });
  };

  return (
    <Card>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{Title}</Text>
      <Text>{Date}</Text>
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
        <TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="perm-device-information" size={30} color="#535454" />
            <Text> Inform Us</Text>
          </View>
        </TouchableOpacity>
        {ifAdmin ? (
          <TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="mode-edit" size={30} color="#535454" />
              <Text> Edit Recod</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {ifAdmin ? (
          <TouchableOpacity>
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
