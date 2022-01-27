import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import {Header, Divider, Avatar, Badge} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageSlider from '../../components/home/ImageSlider';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import MenuButton from '../../components/home/MenuButton';
import BottomTab from '../../components/home/BottomTab';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Home = ({navigation}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    SystemNavigationBar.setNavigationColor('#0a67fc', true);
  }, []);

  const headerY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 10],
    extrapolate: 'clamp',
  });
  const BorderRadius = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });
  const HeaderTitle = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 120],
    extrapolate: 'clamp',
  });
  const HeaderTitleSize = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });
  const NotificationBtn = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 200],
    extrapolate: 'clamp',
  });
  const HideSubText = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={{flex: 1}}>
      {/*   <Header centerComponent={<Text>Home</Text>} /> */}
      <StatusBar translucent backgroundColor={'transparent'} />

      {/* <View style={{paddingTop: 22, marginBottom: 20}}>
        <ImageSlider />
      </View> */}

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
            },
          ],
          {useNativeDriver: true},
        )}>
        {/* Header */}
        <Animated.View
          style={{
            height: 250,
            backgroundColor: '#0a67fc',
            borderBottomRightRadius: BorderRadius,
            padding: 20,
            zIndex: 1000,
            transform: [
              {
                translateY: headerY,
              },
            ],
          }}>
          <TouchableOpacity>
            <Animated.View
              style={{
                marginTop: 10,
                marginRight: 10,
                alignSelf: 'flex-end',

                transform: [
                  {
                    translateY: NotificationBtn,
                  },
                ],
              }}>
              <Badge
                status="primary"
                value={10}
                containerStyle={{
                  position: 'absolute',
                  top: 0,
                  left: 15,
                  marginLeft: 10,
                }}
                badgeStyle={{backgroundColor: '#fc036f'}}
              />

              <Icon name="md-notifications-outline" size={30} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
          <Animated.View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              transform: [
                {
                  translateY: HeaderTitle,
                },
                {
                  scale: HeaderTitleSize,
                },
              ],
            }}>
            <Avatar
              size={64}
              containerStyle={{}}
              avatarStyle={{borderRadius: 15}}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg',
              }}
            />
            <Badge
              status="success"
              containerStyle={{
                position: 'absolute',
                top: 0,
                left: 55,
              }}
              badgeStyle={{height: 10, width: 10}}
            />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 30,
                marginLeft: 40,
                alignSelf: 'center',
              }}>
              Mr Roobt
            </Text>
          </Animated.View>
          <Animated.Text
            style={{
              color: '#fff',
              fontSize: 20,
              marginTop: 10,
              alignSelf: 'center',
              opacity: HideSubText,
            }}>
            ID 980004728 V
          </Animated.Text>
        </Animated.View>
        <Divider style={{height: 5, width: '100%'}} />
        {/* End Header */}
        <MenuButton
          title="News Feed"
          icon={require('../../assets/icon/newspaper.png')}
          onPress={() => navigation.navigate('NewsFeed')}
        />
        <MenuButton
          title="Make A Complaint"
          icon={require('../../assets/icon/911.png')}
          onPress={() => navigation.navigate('MakeComplaint')}
        />
        <MenuButton
          title="Pay Fine"
          icon={require('../../assets/icon/referee.png')}
          onPress={() => console.log(headerH, headerY, scrollY)}
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
      </Animated.ScrollView>
      <BottomTab />
    </Animated.View>
  );
};

export default Home;
