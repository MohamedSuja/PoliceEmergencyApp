import {View, Text} from 'react-native';
import React from 'react';
import {AirbnbRating, Avatar, Divider} from 'react-native-elements';
import moment from 'moment';

const RatingCard = props => {
  const {report, rating, name, date} = props;
  return (
    <View style={{marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Avatar
          size={64}
          containerStyle={{marginLeft: 10, marginRight: 15}}
          avatarStyle={{borderRadius: 15}}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/policeapp-32650.appspot.com/o/assets%2Fsecurity-man.png?alt=media&token=09d6333e-2b0c-4bec-a455-7a5cec874e92',
          }}
        />
        <View style={{marginTop: 8}}>
          <Text style={{color: '#000', fontSize: 14, fontWeight: '700'}}>
            {name}
          </Text>
          <Text>{moment(date.toDate()).format('LLL')}</Text>
        </View>
        <View style={{position: 'absolute', right: 15}}>
          <AirbnbRating
            size={11}
            reviewSize={0}
            selectedColor="#942700"
            isDisabled
            defaultRating={rating}
          />
        </View>
      </View>
      {report ? (
        <View style={{backgroundColor: '#fff', margin: 8, padding: 8}}>
          <Text>{report}</Text>
        </View>
      ) : null}

      <Divider
        width={1}
        style={{height: 10, width: '100%', marginBottom: 10}}
      />
    </View>
  );
};

export default RatingCard;
