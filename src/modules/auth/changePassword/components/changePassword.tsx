import styles from "../styles/changePasswordStyle"
import {View,Text,TouchableOpacity,TextInput,Dimensions, ScrollView} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import React,{useState,useEffect} from "react";

const ChangePassword = () => {
    const windowWidth = Dimensions.get('screen').width
    const [passwordVisible,setPasswordVisible] = useState(true)
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <ScrollView style={[styles.container,{paddingTop:windowWidth*0.1}]}>
        <Text style={{fontSize:windowWidth*0.08,fontWeight:'bold',marginBottom:windowWidth*0.3,marginLeft:windowWidth*0.05,marginTop:windowWidth*0.07}}>ChangePassword</Text>
        <View style={[styles.inputContainer,{height:windowWidth*0.17,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
        <FontAwesome name="user" size={24} color="black" />
            <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03}]} placeholder="Enter otp"/>
        </View>
        <View style={[styles.inputContainer,{height:windowWidth*0.17,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
        <TouchableOpacity onPress={togglePasswordVisibility}>{passwordVisible?
        (<Ionicons name="md-eye-off" size={24} color="black" />):(<Ionicons name="md-eye" size={24} color="black" />)}</TouchableOpacity>
            <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03}]} placeholder="new password" secureTextEntry={passwordVisible} />
        </View>
        <TouchableOpacity style={[styles.cta,{height:windowWidth*0.15,borderRadius:windowWidth*0.4,marginBottom:windowWidth*0.05}]}>
        <Text style={{fontSize:windowWidth*0.05,color:'white'}}>submit</Text></TouchableOpacity>
    </ScrollView>
    )
}

export default ChangePassword