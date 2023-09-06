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
    const {currentUser} = useApp()
    const navigation = useNavigation()
    
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

    const addLike =  async() => {
      try{
        let formData = {videoId:vid.videoId,username:currentUser.username}
        const response = await video.addLikes(formData)
        if(response.data === 'already liked'){return}
        setLikes([{videoId:vid.videoId,username:currentUser.username},...likes])
        console.log(response.data);
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
            <View style={{position:'absolute',width:windowWidth*0.2,height:'23%',borderColor:'black',right:0,justifyContent:"space-between",top:windowWidth*0.8}}>
              <TouchableOpacity onPressIn={()=>navigation.navigate('comment',{items:comments,videoId:vid.videoId})} style={{width:windowWidth*0.16,height:windowWidth*0.16,borderRadius:windowWidth*0.5,backgroundColor:'rgba(255, 255, 255, 0.4)',justifyContent:'center',alignItems:"center"}}>
              <FontAwesome name="comment" size={windowWidth*0.08} color="black" />
              <Text style={{fontSize:windowWidth*0.035,fontWeight:'bold'}}>{comments.length}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPressIn={addLike} style={{width:windowWidth*0.16,height:windowWidth*0.16,borderRadius:windowWidth*0.5,backgroundColor:'rgba(255, 255, 255, 0.4)',justifyContent:'center',alignItems:"center"}}>
              <AntDesign name="like1" size={windowWidth*0.08} color="black" />
              <Text style={{fontSize:windowWidth*0.035,fontWeight:'bold'}}>{likes.length}</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>)
}

export default Home
