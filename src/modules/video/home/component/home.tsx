import { AppRegistry,SafeAreaView,Text,View,Dimensions } from "react-native"
import styles from "../styles/homeStyles"
import Vid from '../../api/video';
import axios from "axios"
import React,{useState,useEffect} from "react";
import { NativeModules } from 'react-native';
import YouTube from 'react-native-youtube';
import Swiper from 'react-native-swiper';
import WebView from 'react-native-webview';

interface Video{
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

    const [vid,setVid] = useState<Video>(initialState)
    const windowWidth = Dimensions.get('window').width
    const getRandom = async() => {
        try{
            const response = await video.Random()
            const vidItem = response.data[0]
            setVid(vidItem)
            let q = vidItem.videoId
            let encodedQuery = encodeURIComponent(q);
            const youtubeUrl = axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${encodedQuery}`)
            console.log(youtubeUrl);
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
    <View style={styles.container}>
        <Swiper>
        <WebView
        url={'mn'}
        width="100%"
        height="100%"
        />
        </Swiper>
      
    </View>)
}

export default Home

AppRegistry.registerComponent('myproject', () => Home)
