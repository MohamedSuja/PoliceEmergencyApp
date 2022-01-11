import React, {createContext, useState} from 'react';
import {View, Text} from 'react-native';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
