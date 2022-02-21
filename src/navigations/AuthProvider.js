import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  const addUserData = () => {
    firestore().collection('user').add({
      userId: 'user.uid',
      firstName: 'a',
      lastName: 'b',
      idNo: 'c',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        CardData,
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                addUserData();
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
