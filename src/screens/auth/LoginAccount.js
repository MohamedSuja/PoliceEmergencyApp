import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import MainButton from '../../components/MainButton';
import {AuthContext} from '../../navigations/AuthProvider';
import {HelperText, TextInput} from 'react-native-paper';
import validator from 'validator';

const LoginAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser, login} = useContext(AuthContext);
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);

  useEffect(() => {
    SystemNavigationBar.navigationShow();
  }, []);
  //login(email, password)
  const checkLogin = (email, password) => {
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
      emailCheck == passwordCheck ? login(email, password) : null;
    } else {
      Alert.alert(
        'Wrong Sublimation!',
        'Username or password field cannot be empty.',
        [{text: 'Ok'}],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} hidden={false} />
      <ScrollView contentContainerStyle={styles.mainView}>
        <View>
          <Text style={styles.textStyle}>
            Sign in to Traffic Police Emergency App
          </Text>
          <View style={styles.setMargin}>
            <TextInput
              onBlur={() => {}}
              mode="outlined"
              label="Email"
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
              label="Password"
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
                Password must be at least 6 characters long contain a number and
                an uppercase letter
              </HelperText>
            ) : null}
          </View>
          <View style={styles.flexRowView}>
            <TouchableOpacity>
              <Text style={styles.linkStyle1}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.linkStyle2}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <MainButton
            text="Sign in"
            disabled={false}
            onPress={() => checkLogin(email, password)}
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
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textStyle1: {
    fontWeight: 'bold',
    fontSize: 12,
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
    fontSize: 12,
    color: '#0052fe',
    fontWeight: '500',
  },
  linkStyle2: {
    fontSize: 12,
    color: 'red',
    fontWeight: '500',
  },
  setMargin: {
    marginTop: 15,
  },
  textInputStyle: {
    // height: 45,
    //  paddingHorizontal: 20,
    fontSize: 15,
    //  marginTop: 5,
    //  borderWidth: 2,
    //  borderRadius: 5,
    //   borderColor: 'grey',
  },
  btnView: {
    marginVertical: 20,
  },
});

export default LoginAccount;
