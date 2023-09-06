import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    scrollContainer:{
        width:'100%',
        height:'70%'
      },
      paperIconCont:{
        position:'absolute'
      },
      textinputContainer:{
        width:'88%',
        borderWidth:1,
        borderColor:'grey',
        flexDirection:'row',
        justifyContent:'space-between',
        position:'relative'
      },
      upperContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'grey',
        borderBottomWidth:0.5
      },
      input:{
        borderColor: '#9CA3AF',
        color: '#1F2937',
        textAlignVertical: 'top'
      },
      body:{
        width: '100%',
        height:'100%',
        position:'absolute'
      }
})

export default styles