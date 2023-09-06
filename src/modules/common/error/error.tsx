import {View,Text,StyleSheet,Dimensions,Image,TouchableOpacity} from 'react-native'
import { useState,useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome } from '@expo/vector-icons';

interface ErrorData {
    text: string;
    clearError: () => void;
}
const ErrorComponent = ({text,clearError}:ErrorData) => {
    const windowWidth = Dimensions.get('window').width;
    SplashScreen.preventAutoHideAsync();

    const [isLoaded] = useFonts({
      "Roboto": require("../../../../assets/fonts/Roboto-Bold.ttf"),
      "Pacifico": require("../../../../assets/fonts/Pacifico-Regular.ttf")
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
        <View onLayout={handleOnLayout} style={[styles.errorContainer,{padding:windowWidth * 0.01,paddingHorizontal:windowWidth * 0.05,borderRadius:windowWidth * 0.03,top:windowWidth*0.25}]}>
            <Text style={[styles.errorText,{fontSize:windowWidth * 0.04,fontFamily:'Roboto'}]}>{text}</Text>
            <TouchableOpacity onPress={() => clearError() }><FontAwesome name="close" size={windowWidth*0.05} color="black" /></TouchableOpacity>
        </View>
    )
}

export default ErrorComponent

const styles = StyleSheet.create({
    errorContainer:{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#DA3E52',
        position:"absolute",
        width:'95%',
        height:'10%',
        zIndex:1,
        flexDirection: 'row',
      },
      errorText:{
        color:'white',
        fontWeight:'bold'
      }
})