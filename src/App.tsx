import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Splash, Login, Register, UpdatePassword, ChangePassword} from '../src/modules/auth/index'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import TabBar from './modules/video/components/tabNavigator/tabNavigation';
import { AppProvider } from './modules/common/context/appContext';
import 'react-native-gesture-handler';
axios.defaults.baseURL = 'https://vidme-2iex.onrender.com/';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <AppProvider>
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Splash">
       <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false,gestureEnabled: false }}/>
       <Stack.Screen name="Register" component={Register} options={{ headerShown: false,gestureEnabled: false }}/>
       <Stack.Screen name="Login" component={Login} options={{ headerShown: false,gestureEnabled: false }}/>
       <Stack.Screen name="ForgotPassword" component={UpdatePassword} options={{ headerShown: false,gestureEnabled: false }}/>
       <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false,gestureEnabled: false }}/>
       <Stack.Screen name="tab" component={TabBar} options={{ headerShown: false,gestureEnabled: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
  );
}
