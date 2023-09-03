 
 import styles from "../styles/splashStyle"
 import {View,SafeAreaView,TouchableOpacity,Text,Dimensions} from 'react-native'
 import { Video,ResizeMode } from 'expo-av';
import React,{useState,useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font'; 
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

 const Splash = () => {
    const video = React.useRef(null);
    const windowWidth = Dimensions.get('window').width
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();
  
    const [loaded] = useFonts({
        Pattaya:require('../../../../../assets/fonts/Pattaya-Regular.ttf')
    })

    if(!loaded){
        return null
    }

    return(
    <View style={[styles.container,{}]}>
         
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
      <Text style={[styles.textHeader,{fontSize:windowWidth*0.1,fontWeight:'bold', top: windowWidth*0.3,left: windowWidth*0.3,fontFamily:'Pattaya'}]}>VID MATE</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[styles.cta,{bottom:windowWidth*0.2,height:windowWidth*0.15,borderRadius:windowWidth*0.4}]}>
        <Text style={{fontSize:windowWidth*0.05,color:'#ffffff',fontWeight:'bold'}}>get started</Text></TouchableOpacity>
      </View>
    </View>)
}

export default Splash