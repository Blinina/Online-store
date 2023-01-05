import {
  createContext, useContext, useState,
} from 'react';

export type typeLoggedIn = {
  fullName: string,
  email: string,
  password: string,
  "role": string,
  "_id": string,
  __v: string,
  token: string,
}
export type typeAuthContent = {
  getUsername: () => string | null;
  logIn: (data: any) => void;
  logOut: () => void;
  loggedIn: typeLoggedIn | null;
}

const AuthContext = createContext<typeAuthContent | null>(null);

export default function AuthProvider({ children }: any) {
  const userLoggin: any = JSON.parse(localStorage.getItem('user') || '{}');
  const [loggedIn, setLoggedIn] = useState<typeLoggedIn | null>(userLoggin !== '{}' ? { ...userLoggin } : null);

  const logIn = (data: any) => {
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedIn({ ...data });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(null);
  };

  const getUsername = () => {
    if (userLoggin) {
      return userLoggin.fullName;
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getUsername
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
