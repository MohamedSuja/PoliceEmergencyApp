import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AppHeader from '../../components/AppHeader';
import {RFValue} from 'react-native-responsive-fontsize';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import IconButton from '../../components/IconButton';

const img = [
  'https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg',
  'https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg',
  'https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg',
  'https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg',
  'https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg',
];

const ViewComplaint = ({navigation}) => {
  return (
    <View style={{flex: 1, marginBottom: 0}}>
      <AppHeader
        // title="ViewComplaint"
        backgroundColor={'grey'}
        navigation={() => navigation.navigate('ShowComplaint')}
        rightComponent={
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgba(255, 255, 255,01)',
              borderRadius: 4,
            }}>
            <TouchableOpacity>
              <Ionicons
                style={{marginRight: 5}}
                name="close-circle-outline"
                size={40}
                color="#f70000"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="checkmark-circle-outline"
                size={40}
                color="#19f700"
              />
            </TouchableOpacity>
          </View>
        }
      />
      <Text style={styles.headertext}>Request Complaint for </Text>
      <View style={{flexDirection: 'row'}}>
        <Avatar
          size={64}
          containerStyle={{margin: 10}}
          avatarStyle={{borderRadius: 50}}
          source={{
            uri: 'https://thumbs.dreamstime.com/b/car-flipped-over-crash-accident-left-one-care-42275978.jpg',
          }}
        />
        <View>
          <Text style={styles.avatarText}>Suja M.F.M</Text>
          <View style={{flexDirection: 'row', marginLeft: 10}}>
            <Icon name="back-in-time" size={20} color="#000" />
            <Text style={{marginLeft: 5}}>1 hour ago</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <Text style={styles.complaintText}>
          The thief tried to break in through the back entrance, after climbing
          down from the roof. Fortunately, he was seen by the neighbour who
          informed us on time. My wife and daughter were alarmed and informed
          the society guard. However, the guard was unable to catch him and the
          burglar ran away. I have attached a CCTV recording with the letter. It
          may prove useful to identify the suspect. There have been quite a
          number of theft cases in our area for the past few weeks. Since it is
          a matter of our safety, I request to look into this matter and take
          the necessary action at the earliest. Looking forward to your kind
          assistance in this matter.
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {img.map((item, index) => (
            <Image
              key={index}
              source={{
                uri: item,
              }}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'contain',
                margin: 2.5,
              }}
            />
          ))}
        </ScrollView>
        <IconButton />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headertext: {
    fontSize: RFValue('25'),
    fontWeight: '800',
    margin: 5,
  },
  avatarText: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: RFValue('18'),
    fontWeight: '800',
    color: '#000',
  },
  complaintText: {
    fontSize: 20,
    margin: 5,
  },
});

export default ViewComplaint;
