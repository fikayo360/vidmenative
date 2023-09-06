import React from 'react'
import ProfilePlaceholder from '../profilePlaceholder/profilePlaceholder';
import {View,Text,StyleSheet,Dimensions,Image} from 'react-native'

const CommentComponent = (props:any) => {

    const windowWidth = Dimensions.get('window').width;
    return (
        <View style={[styles.container,{height:windowWidth * 0.20,padding:windowWidth * 0.02}]}>     
        {props.data.PostcommentProfilePic?(<Image resizeMode='cover' style={{ width: windowWidth*0.1, height: windowWidth*0.1,borderRadius:windowWidth * 0.5 }}
         source={{ uri:props.data.userPic }} />):
        <ProfilePlaceholder username={props.data.PostcommentAuthor} width={windowWidth*0.1} height={windowWidth*0.1}/>}
        <View>

        <View style={[styles.textHeader,{marginBottom:windowWidth * 0.03}]}>
        <Text style={[{fontSize:windowWidth*0.05}]}> {props.data.username} </Text>
        </View>

        <Text style={[{fontSize:windowWidth*0.031}]}> {props.data.comment} </Text>
        </View>    

        </View>
      )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderBottomColor:'grey',
        borderBottomWidth:1,
        width:'100%'
    },
    textHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        
    }
})

export default CommentComponent