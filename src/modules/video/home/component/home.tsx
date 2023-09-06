import { Text,View,Dimensions,RefreshControl,ScrollView,PanResponder,TouchableOpacity,Image,TextInput} from "react-native"
import styles from "../styles/homeStyles"
import Vid from '../../api/video';
import axios from "axios"
import React,{useState,useEffect} from "react";
import { WebView } from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import useApp from "../../../common/hooks/useApp";
import { useNavigation } from "@react-navigation/native";

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
    const [swipedUp, setSwipedUp] = useState(false);
    const [comments,setComments] = useState([])
    const [likes,setLikes] = useState<any>([])
    const windowWidth = Dimensions.get('window').width
    
    const getRandom = async() => {
        try{
            const response = await video.Random()
            const vidItem = response.data[0]
            setVid(vidItem)
            setYturl(`https://www.youtube.com/embed/${encodeURIComponent(vid.videoId)}?autoplay=1&loop=1&mute=1`)
            let videoId = vid.videoId
            const getComments = await video.getComments(videoId)
            setComments(getComments.data)
            const getLikes = await video.getLikes(videoId)
            setLikes(getLikes.data)
        }catch(err){
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
              }
        }
    }

    useEffect(()=>{
        getRandom()
    },[])

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy < -50) {
          setSwipedUp(true)
          getRandom()
        }
      },
      onPanResponderRelease: () => {
        setSwipedUp(false);
      },
    });

    
 

    return (
    <View style={[styles.container,{}]}  {...panResponder.panHandlers}>
        <View style={{width:'100%',height:'91%',marginBottom:windowWidth*0.05}}> 
            <WebView
            javaScriptEnabled={true}
            source={{uri:`https://www.youtube.com/embed/${encodeURIComponent(vid.videoId)}?autoplay=1&loop=1&mute=1`}}
            width="100%"
            height="90%"
            /> 
        </View>
    </View>)
}

export default Home
