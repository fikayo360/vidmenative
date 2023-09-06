import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity,View,Dimensions,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useApp from '../../../common/hooks/useApp';
import { removeToken,getToken } from '../../../../utils/tokenStorage';
import { useCallback } from 'react';
import Home from '../../home/component/home';

const TabBar = () => {
    const windowWidth = Dimensions.get('window').width
    const Tab = createBottomTabNavigator()
    const {theme} = useApp()
    const navigation = useNavigation()
    const screenOptions = {
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        height:'5.5%',
        width: '100%',
        backgroundColor:theme==='dark'?'#1e1e1e':'white',
        alignItems: 'center'
      },
    } as const;
  
    const remtoken = async() => {
      await removeToken()
      let cooki = await getToken()
      if (cooki === null){
        navigation.navigate('Login')
      }
  }
  
    return (
              <Tab.Navigator screenOptions={screenOptions} initialRouteName="home">
                  <Tab.Screen name="home" component={Home} options={{
                   tabBarIcon:({focused})=>{
                    return (
                    <View>
                        <FontAwesome5 name="video" size={windowWidth*0.07} color={focused?'#6153CC':theme==='dark'?'#fafafa':"black"} />
                    </View>)
                   }
                  }}/>
  
                  <Tab.Screen
                  name="Logout"
                  component={useCallback(()=> null,[])} 
                  options={{
                   tabBarIcon:({focused})=>{
                    return (
                    <TouchableOpacity onPress={remtoken}>
                      <MaterialCommunityIcons name="logout" size={windowWidth*0.07} color={focused?'#6153CC':theme==='dark'?'#fafafa':"black"} />
                    </TouchableOpacity>)
                   }
                  }}
                />
              </Tab.Navigator>
    )
      
  }
  
  export default TabBar