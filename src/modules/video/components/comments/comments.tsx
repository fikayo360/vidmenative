import React from 'react'
import {View} from 'react-native'
import CommentComponent from './commentComponent'


const CommentItems = (props:any) => {
  return (
    <View>
    
    {
        
    props.data && props.data.map((item:any,index:any) =>
     (
        
        <CommentComponent data={item} key={index.toString()} />
    ))
    }
</View>
  )
}

export default CommentItems