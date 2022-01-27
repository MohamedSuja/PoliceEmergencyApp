import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {Card, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const ImageScreenWidth = Dimensions.get('window').width;

const PostCard = props => {
  const {Title, Subject, Date, ImageFiles, ifAdmin, navigation, indexData} =
    props;

  const naviToView = i => {
    navigation.navigate('NewsView', {indexData: i});
  };

  return (
    <Card>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>{Title}</Text>
      <Text>{Date}</Text>
      <Divider style={{height: 10, marginBottom: 10}} />
      <Text numberOfLines={3} style={{flexShrink: 1}}>
        {Subject}
      </Text>
      <TouchableOpacity onPress={() => naviToView(indexData)}>
        <Text style={{fontWeight: 'bold', color: '#000'}}> SeeMore</Text>
      </TouchableOpacity>
      {/*  ///Image fb Card */}
      <View
        style={{
          flexWrap: 'wrap',
          alignContent: 'stretch',
          marginTop: 10,
          height: 310,
        }}>
        {ImageFiles.slice(0, 3).map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => naviToView(indexData)}>
            <Image
              style={{
                width: 170,
                height: index == 0 ? 304 : 150,
                marginTop: 4,
                resizeMode: 'cover',
              }}
              source={{
                uri: item.localUrl,
              }}
            />
            {index == 2 ? (
              <View
                style={{
                  width: 170,
                  height: index == 0 ? 304 : 150,
                  marginTop: 4,
                  position: 'absolute',
                  alignItems: 'center',
                  opacity: 0.7,
                  backgroundColor: '#fff',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 25,
                    marginTop: 49,
                    color: '#000',
                  }}>
                  See More +
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
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

export default PostCard;
