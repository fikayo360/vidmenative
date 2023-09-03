import { useContext } from 'react';
import { AppContext } from '../context/appContext';

const useApp = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const { currentUser, setCurrentUser,login,logout,updateProfilePic,theme,toggleTheme } = context

  return { currentUser, setCurrentUser,login, logout,updateProfilePic,theme,toggleTheme }
};

export default useApp;