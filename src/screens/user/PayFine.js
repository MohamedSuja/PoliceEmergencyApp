import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import AppHeader from '../../components/AppHeader';

const PayFine = ({navigation}) => {
  return (
    <View style={{flex: 1, marginBottom: 40}}>
      <AppHeader
        navigation={() => navigation.navigate('Home')}
        title={'Your Penalties'}
      />
      <Divider color="#000" />
      <ScrollView style={styles.scroll}>
        <Card containerStyle={styles.penaltiCard}></Card>
        <Card
          containerStyle={{
            margin: 8,
            padding: 5,
            borderRadius: 10,
          }}>
          <View style={styles.menuItemStyle}>
            {/* 
              <BouncyCheckbox
                onPress={checkboxValue => selectItem(food, checkboxValue)}
                isChecked={isFoodInCart(food, cartItems)}
                iconStyle={{
                  borderColor: 'lightgray',
                  borderRadius: 0,
                }}
                fillColor="green"
              /> */}

            <FoodInfo />
            <FoodImage />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default PayFine;

const FoodInfo = props => (
  <View style={{width: 240, justifyContent: 'space-evenly'}}>
    <Text style={styles.titleStyle}>'hg'</Text>
    <Text>'dsf'</Text>
    <Text>'12'</Text>
  </View>
);

const FoodImage = props => (
  <View>
    <Image
      source={{
        uri: 'https://asiafoundation.org/wp-content/uploads/2017/11/SriLankaVAWdatabasetraining-1080x608.jpg',
      }}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  penaltiCard: {
    margin: 5,
  },
  scroll: {},
  menuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: '600',
  },
});
