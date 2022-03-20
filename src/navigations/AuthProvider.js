import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const [userIdNo, setUserIdNo] = useState();
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userData, setUserData] = useState([]);
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('Male');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState();
  const [pickLocation, setPickLocation] = useState();
  const [promote, setPromote] = useState('public');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const addUserData = data => {
    firestore().collection('user').doc(data.user.uid).set({
      userId: data.user.uid,
      firstName: userFirstName,
      lastName: userLastName,
      idNo: userIdNo,
      address: address,
      gender: gender,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      promote: promote,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userIdNo,
        setUserIdNo,
        userFirstName,
        setUserFirstName,
        userLastName,
        setUserLastName,
        CardData,
        //Home Page
        userData,
        setUserData,
        //2
        address,
        setAddress,
        gender,
        setGender,
        dateOfBirth,
        setDateOfBirth,
        phoneNumber,
        setPhoneNumber,
        email,
        setEmail,
        password,
        setPassword,

        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(data => {
                addUserData(data);
              });
          } catch (e) {
            console.log(e);
            alert(e);
          }
        },

        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            alert(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
            alert(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Test Datas

const ImageUrls = [
  {
    localUrl:
      'https://d8asu6slkrh4m.cloudfront.net/2019/09/toyota-allion-260-sri-lanka.jpg',
  },
  {
    localUrl:
      'https://eh9ti3qk8yf3m8xqr5gt2fp4-wpengine.netdna-ssl.com/wp-content/uploads/2021/06/25470872_web1_210525-ABB-traffic-collisions-crash_3-768x512.jpg',
  },
  {
    localUrl:
      'https://www.dailynews.lk/sites/default/files/news/2017/04/12/z_p01-Five-killed.jpg',
  },
  {
    localUrl:
      'https://eh9ti3qk8yf3m8xqr5gt2fp4-wpengine.netdna-ssl.com/wp-content/uploads/2021/06/25470872_web1_210525-ABB-traffic-collisions-crash_3-768x512.jpg',
  },
  {
    localUrl:
      'https://www.dailynews.lk/sites/default/files/news/2017/04/12/z_p01-Five-killed.jpg',
  },
];
const CardData = [
  {
    Title: 'This car was stollen',
    Subject:
      'Call your local police department and tell them you need to file a stolen vehicle report. Be prepared to provide these details: Car make and model, license plate number, vehicle identification number (VIN), color, and year. The date and time you last saw the car.',
    Date: '21 Jan 2022',
    ifAdmin: true,
    ImageFiles: ImageUrls,
  },
  {
    Title: 'fdgfgfdgfdg fdgThis car was excident 🚨',
    Subject:
      'Call your local police department and tell them you need to file a stolen vehicle report. Be prepared to provide these details: Car make and model, license plate number, vehicle identification number (VIN), color, and year. The date and time you last saw the car.',
    Date: '21 Jan 2022',
    ifAdmin: true,
    ImageFiles: ImageUrls,
  },
];
