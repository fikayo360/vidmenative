import { useState,useCallback,useEffect } from "react"
import styles from "../styles/commentStyles"
import { View,Image,Text,TouchableOpacity,Dimensions,ScrollView,TextInput,RefreshControl} from 'react-native';
import ProfilePlaceholder from "../../components/profilePlaceholder/profilePlaceholder";
import useApp from "../../../common/hooks/useApp";
import CommentItems from "../../components/comments/comments";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import Vid from '../../api/video';

const Comment = ({route}:any) => {
    const {videoId} = route.params;
    const [refreshing, setRefreshing] = useState(false);
    const windowWidth = Dimensions.get('window').width
    const {currentUser} = useApp()
    const [items,setItems] = useState<any>([])
    const [comment,setCom] = useState('')
    const onRefresh = useCallback(async()=>{
        setRefreshing(true);
        setRefreshing(false);
      },[])
    const video = new Vid()

    const addComments = async () => {
        if (!comment){
            console.log('fields cant be blank');
            return
        }
        let data = { videoId,
            username:currentUser.username,
            userPic:currentUser.profile_pic,
            comment}
    
        try{
            const response = await video.addComment(data)
            setItems([{ videoId,username:currentUser.username,userPic:currentUser.profile_pic,comment},...items])
            setCom('')
            console.log(response.data)
            console.log(items);
        }catch(err){
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data);
              }
        }
    }

    const getComments = useCallback(() => {
        async() => {
            let data = videoId
            try{
                const response = await video.getComments(data)
                console.log(response.data);
                setItems(response.data)
            }catch(err){
                if (axios.isAxiosError(err)) {
                    console.log(err.response?.data);
                  }
            }
        }
    },[])
    
    useEffect(()=>{
        getComments()
    },[items])

    return (
        
            <View style={[styles.body,{paddingTop:windowWidth*0.04}]}>
            <View style={[styles.upperContainer,{height:windowWidth * 0.40,paddingTop:windowWidth*0.08,paddingRight:windowWidth*0.03}]}>

            <View style={[styles.textinputContainer,{height:windowWidth * 0.23,borderRadius:windowWidth* 0.01,
            padding:windowWidth * 0.02,marginRight:windowWidth*0.03,marginLeft:windowWidth * 0.06}]}>
            <TextInput
            style={[styles.input,{fontSize:windowWidth * 0.05}]}
            multiline={true}
            value={comment}
            onChangeText={(value) => setCom(value)}
            placeholder="add comment"
            placeholderTextColor={'black'}

            /> 
            <TouchableOpacity onPress={addComments} style={[styles.paperIconCont,{top:windowWidth * 0.04, right:windowWidth * 0.02}]}>
            <FontAwesome name="paper-plane" size={windowWidth*0.06} color="black" />
            </TouchableOpacity>
            </View>
            </View>
            {items.length > 0 && ( 
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
              <CommentItems data={items} />
            </ScrollView>)}
            </View>
      
    )
}

export default Comment