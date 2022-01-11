import React, {useEffect} from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';

const welcome = ({navigation}) => {
  useEffect(() => {
    SystemNavigationBar.navigationHide();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <View style={{height: '100%'}}>
        <Onboarding
          onSkip={() => navigation.navigate('CreateAccount')}
          onDone={() => navigation.navigate('CreateAccount')}
          pages={[
            {
              backgroundColor: '#991f00',
              image: (
                <LottieView
                  style={{height: 300, alignSelf: 'center'}}
                  source={require('../../assets/animation/police-badge.json')}
                  autoPlay
                  speed={0.5}
                  loop={true}
                />
              ),

              title: 'Welcome to Traffic Police Emergency App',
              subtitle: 'Developed by Suja',
            },
            {
              backgroundColor: '#025716',
              image: (
                <LottieView
                  style={{height: 300, alignSelf: 'center'}}
                  source={require('../../assets/animation/cop-riding-motorcycle.json')}
                  autoPlay
                  speed={0.2}
                  loop={true}
                />
              ),

              title: 'Our Application For Your Safety lifestyle',
              subtitle: '',
            },
            {
              backgroundColor: '#3366cc',
              image: (
                <LottieView
                  style={{height: 300, alignSelf: 'center'}}
                  source={require('../../assets/animation/police.json')}
                  autoPlay
                  speed={0.2}
                  loop={true}
                />
              ),

              title: 'Get Start Connect With Us Online',
              subtitle: 'Done with React Native',
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default welcome;
