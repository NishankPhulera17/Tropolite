import React from 'react';
import {View,Text,Platform, TouchableOpacity} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/dashboard/Dashboard';
import Home from 'react-native-vector-icons/AntDesign'
import Gift from 'react-native-vector-icons/AntDesign'
import Book from 'react-native-vector-icons/AntDesign'
import {useSelector, useDispatch} from 'react-redux';
import Wave from '../../assets/svg/bottomDrawer.svg'
import PoppinsTextMedium from '../components/electrons/customFonts/PoppinsTextMedium';


const Tab = createBottomTabNavigator();

//custom bottom drawer 



function BottomNavigator({navigation}) {
  const ternaryThemeColor = useSelector(
    state => state.apptheme.ternaryThemeColor,
  )
    ? useSelector(state => state.apptheme.ternaryThemeColor)
    : 'grey';
  const userData = useSelector(state => state.appusersdata.userData)
  const workflow = useSelector(state => state.appWorkflow.program)

    const platformFontWeight = Platform.OS==="ios" ? "400":"800"
    console.log("workflow",workflow)

  return (
    <Tab.Navigator tabBar={()=><View style={{alignItems:"center",justifyContent:"center",width:"100%",backgroundColor:"#F7F7F7"}}>
      <Wave style={{top:10}} width={100}></Wave>
    <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",height:60,backgroundColor:"white",width:'100%'}}>
    <TouchableOpacity onPress={()=>{navigation.navigate('Dashboard')}} style={{alignItems:"center",position:'absolute', left:30}}>
    <Home name="home" size={24} color={ternaryThemeColor}></Home>
    <PoppinsTextMedium style={{marginTop:4,fontSize:12,fontWeight:platformFontWeight,color:'black'}} content="Home"></PoppinsTextMedium>
    </TouchableOpacity>
    {/* ozone change */}
    { 
   <TouchableOpacity onPress={()=>{navigation.navigate('RedeemRewardHistory')}} style={{alignItems:"center",justifyContent:"center",}}>
    <Gift name="gift" size={24} color={ternaryThemeColor}></Gift>
    <PoppinsTextMedium style={{marginTop:4,fontSize:12,fontWeight:platformFontWeight,color:'black'}} content="Rewards"></PoppinsTextMedium>
    </TouchableOpacity>
    }
    <TouchableOpacity onPress={()=>{navigation.navigate('Passbook')}} style={{alignItems:"center",justifyContent:"center",position:'absolute',right:30}}>
    <Book name="book" size={24} color={ternaryThemeColor}></Book>
    <PoppinsTextMedium style={{marginTop:4,fontSize:12,fontWeight:platformFontWeight,color:'black'}} content="Passbook"></PoppinsTextMedium>
    </TouchableOpacity>
    </View>
    </View>}>
      <Tab.Screen  options={{headerShown:false,
      tabBarLabel:"Home",
    tabBarIcon:()=><Home name="home" size={24} color={ternaryThemeColor}></Home>
    }} name="DashboardBottom" component={Dashboard} />
    </Tab.Navigator>
  );
}

export default BottomNavigator