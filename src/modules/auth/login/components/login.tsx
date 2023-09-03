import styles from "../styles/loginStyles"
import {View,Text,TouchableOpacity,TextInput,Dimensions, ScrollView} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import Auth from '../../api/authApi'
import React,{useState,useEffect} from "react";
import { useReducer } from 'react';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { storeToken} from '../../../../utils/tokenStorage';


const Login = () => {
    const windowWidth = Dimensions.get('screen').width
    const [passwordVisible,setPasswordVisible] = useState(true)
    const navigation = useNavigation()

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const api = new Auth
    const initialState = {
        username: '',
        password: '',
      };
    
      const reducer = (state:any, action:any) => {
        switch (action.type) {
          case 'setUsername':
            return { ...state, username: action.payload };
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
        console.log(state.username,state.password);
        try{
            if (!state.username || !state.password){
                console.log('fields cant be empty')
                // setError('fields cant be empty')
                return
            }
    
            const formData = {
                username:state.username,password:state.password
            }

            const response = await api.Login(formData)
            const token = response.data.cookie
            console.log(response.data);
            await storeToken(token)
            dispatch({ type: 'reset' })
            // navigation.navigate('Login')
        }catch(err){
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
                // setLoading(true)
                //return err.response?.data;
              }
        }
      }

    return (
        <ScrollView style={[styles.container,{paddingTop:windowWidth*0.1}]}>
        <Text style={{fontSize:windowWidth*0.08,fontWeight:'bold',marginBottom:windowWidth*0.3,marginLeft:windowWidth*0.05,marginTop:windowWidth*0.07}}>Signin</Text>
        <View style={[styles.inputContainer,{height:windowWidth*0.17,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
        <FontAwesome name="user" size={24} color="black" />
            <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03}]}
             placeholder="username"
             onChangeText={text => dispatch({ type: 'setUsername', payload:text})} 
             value={state.username}
             />
        </View>
        <View style={[styles.inputContainer,{height:windowWidth*0.17,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
        <TouchableOpacity onPress={togglePasswordVisibility}>{passwordVisible?
        (<Ionicons name="md-eye-off" size={24} color="black" />):(<Ionicons name="md-eye" size={24} color="black" />)}</TouchableOpacity>
            <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03}]} placeholder="password" 
            secureTextEntry={passwordVisible} 
            onChangeText={text => dispatch({ type: 'setPassword', payload:text})} 
            value={state.password}
            />
        </View>
        <TouchableOpacity onPress={submit} style={[styles.cta,{height:windowWidth*0.15,borderRadius:windowWidth*0.4,marginBottom:windowWidth*0.05}]}>
        <Text style={{fontSize:windowWidth*0.05,color:'white'}}>signup</Text>
        </TouchableOpacity>
        <View style={{alignItems:'center',flexDirection:'row',width:'96%',alignSelf:'center',justifyContent:'center'}}>
        <Text style={{fontWeight:'bold',fontSize:windowWidth*0.04,alignSelf:'center',marginRight:windowWidth*0.02}}>not a user</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')}><Text style={{fontWeight:'bold',fontSize:windowWidth*0.04,color:'blue'}}>signUp</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginTop:windowWidth*0.07,alignSelf:'center'}} onPress={()=>navigation.navigate('ForgotPassword')}>
            <Text style={{fontWeight:'bold',fontSize:windowWidth*0.04,color:'blue'}}>forgotPassword?</Text></TouchableOpacity>
    </ScrollView>
    )
}

export default Login