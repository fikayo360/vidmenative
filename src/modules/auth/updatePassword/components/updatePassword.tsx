import styles from "../styles/updatePasswordStyle";
import {View,Text,TouchableOpacity,TextInput,Dimensions, ScrollView,ActivityIndicator} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Auth from '../../api/authApi'
import React,{useState,useEffect,useCallback} from "react";
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ErrorComponent from "../../../common/error/error";
const UpdatePassword = () => {
    const windowWidth = Dimensions.get('screen').width
    const api = new Auth
    const navigation = useNavigation()
    const [email,setEmail] = useState('')
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)
    const clearError = () => {
      setError("")
    }
    const submit = async() => {
        console.log(email);
        try{
          setLoading(false)
            if (!email){
                console.log('fields cant be empty')
                setError('fields cant be empty')
                setLoading(true)
                return
            }
    
            const formData = {
               email:email
            }

            const response = await api.ForgotPassword(formData)
            setLoading(true)
            console.log(response.data);
            setEmail('')
            navigation.navigate('ChangePassword')
        }catch(err){
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
                setLoading(true)
                setError(err.response?.data)
              }
        }
      }

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
        <Text style={{fontSize:windowWidth*0.08,fontFamily:'Pacifico',marginBottom:windowWidth*0.3,marginLeft:windowWidth*0.05,marginTop:windowWidth*0.07}}>UpdatePassword</Text>
        <View style={[styles.inputContainer,{height:windowWidth*0.16,borderRadius:windowWidth*0.4,padding:windowWidth*0.03,paddingLeft:windowWidth*0.03,marginBottom:windowWidth*0.1}]}>
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput style={[styles.txtInput,{marginLeft:windowWidth*0.03,fontFamily:'Roboto'}]} 
                placeholder="enter emailAddress"
                onChangeText={text => setEmail(text)} 
                value={email}
                />
            </View>
       
        <TouchableOpacity onPress={submit} style={[styles.cta,{height:windowWidth*0.15,borderRadius:windowWidth*0.4,marginBottom:windowWidth*0.05}]}>
          {loading? <Text style={{fontSize:windowWidth*0.05,color:'white',fontFamily:'oswald'}}>submit</Text>:
          <ActivityIndicator size="large" color="black" style={{position:'absolute'}}/>}
        </TouchableOpacity>
    </ScrollView>
    )

}

export default UpdatePassword