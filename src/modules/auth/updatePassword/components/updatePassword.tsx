import styles from "../styles/updatePasswordStyle";
import {View,Text,TouchableOpacity,TextInput,Dimensions, ScrollView} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import React,{useState,useEffect} from "react";

const UpdatePassword = () => {
    const windowWidth = Dimensions.get('screen').width
    return (
        <ScrollView style={[styles.container,{paddingTop:windowWidth*0.1}]}>
        <Text style={{fontSize:windowWidth*0.08,fontWeight:'bold',marginBottom:windowWidth*0.3,marginLeft:windowWidth*0.05,marginTop:windowWidth*0.07}}>UpdatePassword</Text>
        <View style={[styles.inputContainer,{height:windowWidth*0.16,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03}]} placeholder="enter emailAddress"/>
            </View>
       
        <TouchableOpacity style={[styles.cta,{height:windowWidth*0.15,borderRadius:windowWidth*0.4,marginBottom:windowWidth*0.05}]}>
        <Text style={{fontSize:windowWidth*0.05,color:'white'}}>submit</Text></TouchableOpacity>
    </ScrollView>
    )

}

export default UpdatePassword