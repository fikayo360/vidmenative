import { AppRegistry,SafeAreaView,Text,View,Dimensions } from "react-native"
import styles from "../styles/homeStyles"
import Vid from '../../api/video';
import axios from "axios"
import React,{useState,useEffect} from "react";
import { NativeModules } from 'react-native';
import YouTube from 'react-native-youtube';
import { Video,ResizeMode } from 'expo-av';
import Swiper from 'react-native-swiper';
import WebView from 'react-native-webview';
import { FullscreenVideo } from 'react-native-fullscreen-video';

interface Videoo{
    id:string;
    videoId: string;
    title:string;
    description: string;
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    thumbnailUrl: string;
    createdAt: string;
    updatedAt: string;
}
const Home = () => {
    const vidRef = React.useRef(null);
    const video = new Vid()
    const initialState = {
        id: "",
        videoId: "",
        title: "",
        description: "",
        publishedAt: "",
        channelId: "",
        channelTitle: "",
        thumbnailUrl: "",
        createdAt: "",
        updatedAt: ""
    }

    const [vid,setVid] = useState<Videoo>(initialState)
    const [yTurl,setYturl] = useState('')
    
    const windowWidth = Dimensions.get('window').width
    const getRandom = async() => {
        try{
            const response = await video.Random()
            const vidItem = response.data[0]
            setVid(vidItem)
            let q = vid.videoId
            let encodedQuery = encodeURIComponent(q);
            const youtubeUrl = `https://www.youtube.com/watch?v=${encodedQuery}&playsinline=1`
            setYturl(youtubeUrl)
            console.log(youtubeUrl,yTurl,vid.videoId);
        }catch(err){
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
                // setLoading(true)
                //return err.response?.data;
              }
        }
    }

    useEffect(()=>{
        getRandom()
    },[])

    return (
    <View style={[styles.container,{paddingTop:windowWidth*0.08}]}>
       
        <View style={{flex:1}}>
        {/* <Video
         style={styles.video}
         source={{uri:yTurl}}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay
        resizeMode={ResizeMode.COVER}
      /> */}
      <FullscreenVideo source={{ uri: yTurl }} />
        </View>
       
            
    </View>)
}

export default Home

// AppRegistry.registerComponent('myproject', () => Home)
