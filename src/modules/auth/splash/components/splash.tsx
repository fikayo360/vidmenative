 
 import styles from "../styles/splashStyle"
 import {View,SafeAreaView,TouchableOpacity,Text,Dimensions} from 'react-native'
 import { Video,ResizeMode } from 'expo-av';
import React,{useState,useEffect,useCallback} from "react";
import { useNavigation } from '@react-navigation/native';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
 const Splash = () => {
   
    const windowWidth = Dimensions.get('window').width
    const navigation = useNavigation();
  
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

    return(
    <View onLayout={handleOnLayout} style={[styles.container]}>
         
         <View style={{flex:1}}>
         <Video
         style={styles.video}
         source={require('../../../../../assets/videos/funny1.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.COVER}
      />
      <Text style={[styles.textHeader,{color:'#FF1D15',fontSize:windowWidth*0.13, top: windowWidth*0.15,left: '10%',fontFamily:"Pacifico"}]}>VID MATE</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[styles.cta,{bottom:windowWidth*0.2,height:windowWidth*0.15,borderRadius:windowWidth*0.4}]}>
        <Text style={{fontSize:windowWidth*0.05,color:'#ffffff',fontFamily:"Roboto"}}>get started</Text></TouchableOpacity>
      </View>
    </View>)
}

export default Splash