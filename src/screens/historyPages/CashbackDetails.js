import React,{useEffect, useId} from 'react';
import {View, StyleSheet,TouchableOpacity,Image} from 'react-native';
import PoppinsText from '../../components/electrons/customFonts/PoppinsText';
import PoppinsTextMedium from '../../components/electrons/customFonts/PoppinsTextMedium';
import { useSelector } from 'react-redux';
import ButtonNavigate from '../../components/atoms/buttons/ButtonNavigate';

const CashbackDetails = ({navigation}) => {
    const amount =0;
    const ternaryThemeColor = useSelector(
        state => state.apptheme.ternaryThemeColor,
      )
        ? useSelector(state => state.apptheme.ternaryThemeColor)
        : 'grey';
    const date = "2 September 2023 09:12 AM"
    return (
        <View style={{alignItems:"center",justifyContent:"flex-start",height:'100%'}}>
            <View style={{alignItems:"center",justifyContent:"flex-start",flexDirection:"row",width:'100%',marginTop:10,height:40,marginLeft:20}}>
            <TouchableOpacity onPress={()=>{
                navigation.goBack()
            }}>
            <Image style={{height:24,width:24,resizeMode:'contain',marginLeft:10}} source={require('../../../assets/images/blackBack.png')}></Image>

            </TouchableOpacity>
            <PoppinsTextMedium content ="Cashback Details" style={{marginLeft:10,fontSize:16,fontWeight:'600',color:'#171717'}}></PoppinsTextMedium>
            <TouchableOpacity style={{marginLeft:160}}>
            <Image style={{height:30,width:30,resizeMode:'contain'}} source={require('../../../assets/images/notificationOn.png')}></Image>
            </TouchableOpacity>
            </View>
            
            <View style={{alignItems:"center",justifyContent:"center",marginTop:40}}>
                <Image style={{height:80,width:80,resizeMode:"contain"}} source={require('../../../assets/images/greenRupee.png')}></Image>
                <PoppinsTextMedium style={{marginTop:10,fontSize:20,color:'black',width:220}} content="Cashback Received For Spin the win context"></PoppinsTextMedium>
            </View>

            <View style={{padding:10,borderWidth:1,borderStyle:"dashed",backgroundColor:ternaryThemeColor,alignItems:"center",justifyContent:"center",borderRadius:4,opacity:0.7,marginTop:30,width:140}}>
            <PoppinsTextMedium style={{color:'black',fontSize:34,fontWeight:'700'}} content={`₹ ${amount}`}></PoppinsTextMedium>
             </View>
             <View style={{alignItems:"center",justifyContent:"center",marginTop:20}}>
                <PoppinsTextMedium style={{color:'black',fontSize:18,fontWeight:'700'}} content="Credited Date"></PoppinsTextMedium>
                <PoppinsTextMedium style={{color:'black',fontSize:18,fontWeight:'700'}} content={date}></PoppinsTextMedium>

             </View>
             <View style={{alignItems:"center",justifyContent:"center",marginTop:20,position:"absolute",bottom:10,borderTopWidth:1,borderColor:'#DDDDDD',width:'90%',paddingTop:10}}>
                <PoppinsTextMedium style={{color:"black",fontSize:18,fontWeight:"700"}} content="Issue With This ?"></PoppinsTextMedium>
                <ButtonNavigate navigateTo = "SupportQueries" style={{color:"white"}}  content ="Click Here To Report" backgroundColor="#D10000"></ButtonNavigate>
            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default CashbackDetails;
