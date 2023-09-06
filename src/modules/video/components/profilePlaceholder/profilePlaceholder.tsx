import React from 'react'
import {View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';

interface placeholderData {
    username: string;
    width:number;
    height:number;
}

const ProfilePlaceholder = ({username,width,height}:placeholderData) => {
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width;
  const toProfile = () =>  navigation.navigate('Profile', { screen: 'Profile' })
  return (
    <TouchableOpacity onPress={toProfile} style={[styles.wrapper,{height:height, width:width, borderWidth:0.5, borderRadius:windowWidth*0.5}]}>
        <Text style={[styles.text,{fontSize:windowWidth*0.06}]}>{username[0].toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  
  text:{
    color:'white'
  },
  wrapper:{
    backgroundColor:'#A4508B',
    borderColor:'#A4508B',
    justifyContent:'center',
    alignItems:'center'
  }
})

export default ProfilePlaceholder