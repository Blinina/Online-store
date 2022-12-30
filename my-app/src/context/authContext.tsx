import {
     createContext, useContext, useState,
  } from 'react';

  const AuthContext = createContext({});

export default function AuthProvider({children} :any){
    const userLoggin: any = JSON.parse(localStorage.getItem('user'));
    const [loggedIn, setLoggedIn] = useState<any>(userLoggin ? {...userLoggin } : null);
  
    const logIn = (data: any) => {
      localStorage.setItem('user', JSON.stringify(data));
      setLoggedIn({ ...data });
      console.log(loggedIn)
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
