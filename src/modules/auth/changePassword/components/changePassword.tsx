import styles from "../styles/changePasswordStyle"
import {View,Text,TouchableOpacity,TextInput,Dimensions, ScrollView} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import React,{useState,useEffect} from "react";
import { useReducer } from 'react';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import Auth from '../../api/authApi'

const ChangePassword = () => {
    const windowWidth = Dimensions.get('screen').width
    const [passwordVisible,setPasswordVisible] = useState(true)
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }
    const api = new Auth
    const navigation = useNavigation()
    const [email,setEmail] = useState('')
    const [otp,setOtp] = useState('')
    const [newP,setNewP] = useState('')

    const submit = async() => {
        console.log(otp,email,newP);
        try{
            if (!otp || !newP || !email){
                console.log('fields cant be empty')
                // setError('fields cant be empty')
                return
            }
    
            const formData = {
                token:otp,email:email,newPassword:newP
            }
            console.log(formData);

            const response = await api.ChangePassword(formData)
            console.log(response.data);
            setEmail('')
            setOtp('')
            setNewP('')
            navigation.navigate('Splash')
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
        <Text style={{fontSize:windowWidth*0.08,fontWeight:'bold',marginBottom:windowWidth*0.3,marginLeft:windowWidth*0.05,marginTop:windowWidth*0.07}}>ChangePassword</Text>
        <View style={[styles.inputContainer,{height:windowWidth*0.17,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
        <MaterialIcons name="email" size={24} color="black" />
            <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03}]} 
            placeholder="Enter email"
            onChangeText={text => setEmail(text)} 
            value={email}
            />
        </View>
        <View style={[styles.inputContainer,{height:windowWidth*0.17,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
        <MaterialIcons name="add-alert" size={24} color="black" />
            <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03}]} 
            multiline={true}
            numberOfLines={4}
            placeholder="Enter otp"
            onChangeText={text => setOtp(text)} 
            value={otp}
            />
        </View>
        <View style={[styles.inputContainer,{height:windowWidth*0.17,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
        <TouchableOpacity onPress={togglePasswordVisibility}>{passwordVisible?
        (<Ionicons name="md-eye-off" size={24} color="black" />):(<Ionicons name="md-eye" size={24} color="black" />)}</TouchableOpacity>
            <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03}]} 
            placeholder="new password" 
            secureTextEntry={passwordVisible}
            onChangeText={text => setNewP(text)} 
            value={newP}
            />
        </View>
        <TouchableOpacity onPress={submit} style={[styles.cta,{height:windowWidth*0.15,borderRadius:windowWidth*0.4,marginBottom:windowWidth*0.05}]}>
        <Text style={{fontSize:windowWidth*0.05,color:'white'}}>submit</Text>
        </TouchableOpacity>
    </ScrollView>
    )
}

export default ChangePassword