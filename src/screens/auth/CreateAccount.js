import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateAccount = ({navigation}) => {
  const {
    register,
    userIdNo,
    setUserIdNo,
    userFirstName,
    setUserFirstName,
    userLastName,
    setUserLastName,
    address,
    setAddress,
    gender,
    setGender,
    dateOfBirth,
    setDateOfBirth,
    phoneNumber,
    setPhoneNumber,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const scrollViewRef = useRef();

  const handleConfirm = date => {
    setDateOfBirth(date.toString());
    setDatePickerVisibility(false);
  };

  useEffect(() => {
    SystemNavigationBar.navigationShow();
  }, []);

  const scroll = go => {
    address && dateOfBirth
      ? register(email, password)
      : scrollViewRef.current.scrollTo({
          x: go,
          y: 0,
          // animated: false,
        });
  };

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
      emailCheck == passwordCheck ? scroll(SCREEN_WIDTH - 40) : null;
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
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef}>
              <View style={{width: SCREEN_WIDTH - 40, padding: 5}}>
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
                      Password must be at least 6 characters long contain a
                      number and an uppercase letter
                    </HelperText>
                  ) : null}
                </View>
              </View>
              {/* 2nd page */}
              <View style={{width: SCREEN_WIDTH - 40}}>
                <TouchableOpacity onPress={() => scroll(0)}>
                  <Icon
                    name="arrow-back-ios"
                    size={30}
                    color="#000"
                    style={{margin: 10}}
                  />
                </TouchableOpacity>
                <View style={{padding: 10}}>
                  <TextInput
                    mode="outlined"
                    label={'Address'}
                    left={<TextInput.Icon name="home" />}
                    onChangeText={val => setAddress(val)}
                    value={address}
                  />
                  <TextInput
                    mode="outlined"
                    label={'Phone Number'}
                    keyboardType="phone-pad"
                    left={<TextInput.Icon name="phone" />}
                    onChangeText={val => setPhoneNumber(val)}
                    value={phoneNumber}
                    style={{marginTop: 10}}
                  />
                  <View
                    style={{
                      borderRadius: 5,
                      borderColor: '#1100fa',
                      borderWidth: 1,
                      marginTop: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <Icon name="person" size={30} color="#000" />
                    <Picker
                      prompt="Please Select"
                      mode="dropdown"
                      style={{width: 300}}
                      selectedValue={gender}
                      onValueChange={val => setGender(val)}>
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                    </Picker>
                  </View>
                  <TouchableOpacity
                    style={{marginTop: 20}}
                    activeOpacity={1}
                    onPress={() => setDatePickerVisibility(true)}>
                    <TextInput
                      mode="outlined"
                      label={'Date Of Birth'}
                      left={<TextInput.Icon name="cake" />}
                      onPressIn={() => setDatePickerVisibility(true)}
                      editable={false}
                      value={dateOfBirth}
                      //ghgh onChangeText={val => setDateOfBirth(val)}
                    />
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={() => setDatePickerVisibility(false)}
                />
              </View>
            </ScrollView>
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
