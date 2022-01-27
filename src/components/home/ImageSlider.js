import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';

const DATA = [
  {
    image: 'https://dailyexpress.lk/wp-content/uploads/2020/11/Security.jpg',
    title: 'Title 1',
  },
  {
    image:
      'https://noosphereglobal.com/wp-content/uploads/2016/08/Introducing-the-New-Innovative-My-Police-App.jpg',
    title: 'Title 2',
  },
  {
    image: 'http://www.sundaytimes.lk/200503/uploads/PiX-MOBITEL.jpg',
    title: 'Title 3',
  },
  {
    image:
      'https://asiafoundation.org/wp-content/uploads/2017/11/SriLankaVAWdatabasetraining-1080x608.jpg',
    title: 'Title 4',
  },
];

const ImageSlider = () => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const [entries, setEntries] = useState(0);
  const RenderItem = ({item}) => {
    return (
      <View style={{backgroundColor: 'white', borderRadius: 5, marginTop: 5}}>
        <Image
          style={{
            height: 200,
            resizeMode: 'cover',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
          source={{
            uri: item.image,
          }}
        />
        <Text
          style={{
            bottom: 10,
            alignSelf: 'center',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 10,
          }}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={DATA}
        renderItem={RenderItem}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH - 60}
        layout={'default'}
        layoutCardOffset={18}
        onSnapToItem={index => setEntries(index)}
        autoplay
      />

      {/*      <Pagination
        dotsLength={DATA.length}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.7}
        activeDotIndex={entries}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'grey',
        }}
        containerStyle={{
          position: 'absolute',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      /> */}
    </View>
  );
};

export default ImageSlider;
