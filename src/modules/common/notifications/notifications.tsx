import {View,Text,StyleSheet,TouchableOpacity,Dimensions,Image} from 'react-native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState,useCallback } from 'react';
interface notificationData {
    text: string;
    clearNotification: () => void;
}

const NotificationAlert = ({text,clearNotification}:notificationData) => {
    const windowWidth = Dimensions.get('window').width;
    SplashScreen.preventAutoHideAsync();

    const [isLoaded] = useFonts({
      "Roboto": require("../../../../../assets/fonts/Roboto-Bold.ttf"),
      "Pacifico": require("../../../../../assets/fonts/Pacifico-Regular.ttf")
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
        <View onLayout={handleOnLayout} style={[styles.notificationContainer,{padding:windowWidth * 0.01,paddingHorizontal:windowWidth*0.04,borderRadius:windowWidth*0.03, top:windowWidth*0.25}]}>
            <Text style={[styles.notificationText,{fontSize:windowWidth * 0.04,fontFamily:'Roboto'}]}>{text}</Text>
        <TouchableOpacity onPress={() => clearNotification() }><Image style={{ width:windowWidth * 0.04, height:windowWidth * 0.04,}} 
            source={require('../assets/delete.png')} resizeMode='cover' /></TouchableOpacity>
        </View>
    )
    
}

export default NotificationAlert

const styles = StyleSheet.create({
    notificationContainer:{
        alignSelf: 'center',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#000022',
        position:"absolute",
        width:'95%',
        height:'8%',
        zIndex:1,
       
      },
      notificationText:{
        color:'white',
        fontWeight:'bold'
      }
})