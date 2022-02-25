import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MainButton from '../../components/MainButton';
import {RFValue} from 'react-native-responsive-fontsize';
import {AuthContext} from '../../navigations/AuthProvider';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {HelperText, TextInput} from 'react-native-paper';
import validator from 'validator';

const CreateAccount = ({navigation}) => {
  const {
    register,
    userIdNo,
    setUserIdNo,
    userFirstName,
    setUserFirstName,
    userLastName,
    setUserLastName,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);

  useEffect(() => {
    SystemNavigationBar.navigationShow();
  }, []);

  const checkRegister = (email, password) => {
    const emailCheck = validator.isEmail(email);
    const passwordCheck = validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (email && password != '') {
      emailCheck ? setValidateEmail(false) : setValidateEmail(true);
      passwordCheck ? setValidatePassword(false) : setValidatePassword(true);
      emailCheck == passwordCheck ? register(email, password) : null;
    } else {
      alert('Username or password field cannot be empty');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} hidden={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainView}>
        <View>
          <View>
            <Text style={styles.textStyle}>
              Create Your Traffic Police Emergency Account
            </Text>
            <View style={styles.setMargin}>
              <TextInput
                mode="outlined"
                label="FirstName"
                value={userFirstName}
                numberOfLines={1}
                style={styles.textInputStyle}
                onChangeText={val => setUserFirstName(val)}
              />
            </View>
            <View style={styles.setMargin}>
              <TextInput
                mode="outlined"
                label={'LastName'}
                // placeholder="Suja"
                numberOfLines={1}
                style={styles.textInputStyle}
                value={userLastName}
                onChangeText={val => setUserLastName(val)}
              />
            </View>
            <View style={styles.setMargin}>
              <TextInput
                mode="outlined"
                label={'ID No'}
                placeholder="980048272V"
                numberOfLines={1}
                style={styles.textInputStyle}
                value={userIdNo}
                onChangeText={val => setUserIdNo(val)}
              />
            </View>
            <View style={styles.setMargin}>
              <TextInput
                mode="outlined"
                label={'Email'}
                autoCapitalize="none"
                keyboardType="email-address"
                numberOfLines={1}
                style={styles.textInputStyle}
                value={email}
                placeholder="example@email.com"
                onChangeText={val => setEmail(val)}
                outlineColor={validateEmail ? 'red' : 'grey'}
              />
              {validateEmail ? (
                <HelperText style={{fontSize: 14}} type="error">
                  Email address is invalid!
                </HelperText>
              ) : null}
            </View>
            <View style={styles.setMargin}>
              <TextInput
                mode="outlined"
                label={'Password'}
                autoCapitalize="none"
                secureTextEntry={true}
                numberOfLines={1}
                style={styles.textInputStyle}
                value={password}
                placeholder="**********"
                onChangeText={val => setPassword(val)}
                outlineColor={validatePassword ? 'red' : 'grey'}
              />
              {validatePassword ? (
                <HelperText style={{fontSize: 14}} type="error">
                  Password must be at least 6 characters long contain a number
                  and an uppercase letter
                </HelperText>
              ) : null}
            </View>
          </View>
          <View style={styles.section}>
            <Text>
              I certify that I am 18 years of age or older, and I agree to the
              <TouchableWithoutFeedback>
                <Text style={styles.linkStyle2}> User Agreement </Text>
              </TouchableWithoutFeedback>
              and
              <TouchableWithoutFeedback>
                <Text style={styles.linkStyle1}> Privacy Policy </Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <Text>If You Have a Account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginAccount')}>
            <Text style={{color: 'blue', marginLeft: 10}}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnView}>
          <MainButton
            text="Sign up"
            disabled={false}
            onPress={() => checkRegister(email, password)}
            btnStyle={styles.btnStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '100%',
  },
  mainView: {
    flexGrow: 1,
    padding: 60,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  mainView: {
    flexGrow: 1,
    padding: RFValue(60),
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  btnView: {
    marginTop: RFValue(50),
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: RFValue(20),
  },
  textStyle1: {
    fontWeight: 'bold',
    fontSize: RFValue(12),
  },

  btnStyle: {
    backgroundColor: '#0052fe',

    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.6,
    shadowRadius: 15,

    elevation: 23,
  },
  flexRowView: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkStyle1: {
    fontSize: RFValue(12),
    color: '#0052fe',
    fontWeight: '500',
  },
  linkStyle2: {
    fontSize: RFValue(12),
    color: 'red',
    fontWeight: '500',
  },
  setMargin: {
    marginTop: 15,
  },
  textInputStyle: {
    // height: RFValue(45),
    // fontSize: RFValue(15),
    marginTop: 5,
    //backgroundColor: 'transparent',
    borderRadius: 5,
  },

  section: {
    marginTop: 20,
    flexDirection: 'row',
  },
});

export default CreateAccount;
