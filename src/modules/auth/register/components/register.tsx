import styles from "../styles/registerStyles";
import {View,Text,TouchableOpacity,TextInput,Dimensions, ScrollView,ActivityIndicator} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import Auth from '../../api/authApi'
import React,{useState,useEffect,useCallback} from "react";
import { useReducer } from 'react';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ErrorComponent from "../../../common/error/error";

const Register = () => {
    const windowWidth = Dimensions.get('screen').width
    const [passwordVisible,setPasswordVisible] = useState(true)
    const navigation = useNavigation()
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState("")
    const clearError = () => {
      setError("")
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }
    const api = new Auth()
    const initialState = {
        username: '',
        email: '',
        password: '',
      };
    
      const reducer = (state:any, action:any) => {
        switch (action.type) {
          case 'setUsername':
            return { ...state, username: action.payload };
          case 'setEmail':
            return { ...state, email: action.payload };
          case 'setPassword':
            return { ...state, password: action.payload };
          case 'reset':
            return initialState;
          default:
            return state;
        }
      };

      const [state, dispatch] = useReducer(reducer, initialState);

      const submit = async() => {
        console.log(state.username,state.email,state.password);
        try{
           setLoading(false)
            if (!state.username || !state.email || !state.password){
                console.log('fields cant be empty')
                setError('fields cant be empty')
                setLoading(true)
                return
            }
    
            const formData = {
                username:state.username,email:state.email,password:state.password
            }

            const response = await api.Signup(formData)
            setLoading(true)
            console.log(response.data);
            dispatch({ type: 'reset' })
            navigation.navigate('Login')
        }catch(err){
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
                setError(err.response?.data)
                setLoading(true)
              }
        }
      }

      useFocusEffect(() => {
        const handleBackPress = () => {
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
      });

        
    SplashScreen.preventAutoHideAsync();

    const [isLoaded] = useFonts({
      "Roboto": require("../../../../../assets/fonts/Roboto-Bold.ttf"),
      "Pacifico": require("../../../../../assets/fonts/Pacifico-Regular.ttf"),
      "Pattaya": require("../../../../../assets/fonts/Pattaya-Regular.ttf"),
      "oswald": require("../../../../../assets/fonts/Oswald-VariableFont_wght.ttf")
    });

    const handleOnLayout = useCallback(async () => {
      if (isLoaded) {
        await SplashScreen.hideAsync(); //hide the splashscreen
      }
    }, [isLoaded]);
    
    if (!isLoaded) {
      return null;
    }
      
    return (
        <ScrollView onLayout={handleOnLayout} style={[styles.container,{paddingTop:windowWidth*0.1}]}>
          {error !== "" && (<ErrorComponent text={error} clearError={clearError}/>)}
            <Text style={{fontSize:windowWidth*0.08,fontFamily:'Pacifico',marginBottom:windowWidth*0.2,marginLeft:windowWidth*0.05,marginTop:windowWidth*0.07}}>Signup</Text>
            <View style={[styles.inputContainer,{height:windowWidth*0.16,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03,fontFamily:'Roboto'}]} 
                placeholder="emailaddress" 
                onChangeText={text => dispatch({ type: 'setEmail', payload:text})} 
                value={state.email}/>
            </View>
            <View style={[styles.inputContainer,{height:windowWidth*0.17,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
            <FontAwesome name="user" size={24} color="black" />
                <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03,fontFamily:'Roboto'}]}
                 placeholder="username"
                 onChangeText={text => dispatch({ type: 'setUsername', payload:text})} 
                 value={state.username}
                 />
                 
            </View>
            <View style={[styles.inputContainer,{height:windowWidth*0.17,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
            <TouchableOpacity onPress={togglePasswordVisibility}>
            {passwordVisible? (<Ionicons name="md-eye-off" size={24} color="black" />):(<Ionicons name="md-eye" size={24} color="black" />) }
            </TouchableOpacity>
                <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03,fontFamily:'Roboto'}]} 
                placeholder="password" 
                secureTextEntry={passwordVisible} 
                onChangeText={text => dispatch({ type: 'setPassword', payload:text})} 
                value={state.password}
                />
            </View>

            <TouchableOpacity onPress={submit} style={[styles.cta,{height:windowWidth*0.15,borderRadius:windowWidth*0.4,marginBottom:windowWidth*0.05}]}>
              {loading? (<Text style={{fontSize:windowWidth*0.05,color:'white',fontFamily:'oswald'}}>signup</Text>):<ActivityIndicator size="large"
               color="black" style={{position:'absolute'}}/>}
           
            </TouchableOpacity>

            <View style={{alignItems:'center',flexDirection:'row',width:'96%',alignSelf:'center',justifyContent:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:windowWidth*0.04,alignSelf:'center',marginRight:windowWidth*0.02,fontFamily:'Roboto'}}>already a user</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <Text style={{fontSize:windowWidth*0.04,fontWeight:'bold',color:'blue',fontFamily:'Roboto'}}>signin</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Register