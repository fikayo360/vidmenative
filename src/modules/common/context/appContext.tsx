import React, { useState, createContext, ReactNode } from 'react';
import { storeToken } from '../../../utils/tokenStorage';
import axios from 'axios';

interface User {
    id:string,
    email: string,
    username: string,
    profile_pic:string
}

interface AppContextType {
    currentUser: User;
    setCurrentUser: (user: User) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
    theme:string;
    toggleTheme:() => void;
    updateProfilePic:(newProfilePic:string) => void;
  }

  interface AppProviderProps {
    children: ReactNode;
  }
  
  const AppContext = createContext<AppContextType | undefined>(undefined);

  const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState<User>({ id: '',email:'', username: '',profile_pic:''});
    const [theme,setTheme] = useState('light')

    const toggleTheme = () => {
      if(theme === 'light'){
        setTheme('dark')
      }else{
        setTheme('light')
      }
    }

    const login = async (user: User, token: string) => {
      setCurrentUser(user);
      await storeToken(token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      console.log('items saved successfully');
    };
  
    const logout = () => {
      setCurrentUser({  id: '',email:'', username: '',profile_pic:'' });   
      axios.defaults.headers.common['Authorization'] = null
    };

    const updateProfilePic = (newProfilePic:string) => {
      setCurrentUser({
        ...currentUser,
        profile_pic: newProfilePic,
      });
    }
    

    return (
      <AppContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          login,
          logout,
          theme,
          toggleTheme,
          updateProfilePic
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };

  export { AppProvider, AppContext };