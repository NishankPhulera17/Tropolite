import React from 'react';
import {View, StyleSheet,Image,Platform, TouchableOpacity} from 'react-native';
import PoppinsTextMedium from '../electrons/customFonts/PoppinsTextMedium';
import { useNavigation } from '@react-navigation/native';
const DashboardSupportBox = (props) => {
    const navigation = useNavigation()
   const image = props.image 
   const backgroundColor = props.backgroundColor
   const text = props.text
   const borderColor =props.borderColor
    const fontWeight =Platform.OS==='ios' ? '400' : '800'
    const fontSize =Platform.OS==='ios' ? 10 : 12

const handleNavigation=()=>{
    if(text==="Feedback"){
        navigation.navigate('Feedback')
    }
    else if(text ==="Refer and earn")
    {
        navigation.navigate('ReferAndEarn')
    }
    else if(text ==="Rewards")
    {
        navigation.navigate('RedeemRewardHistory')
    }
}

    return (
        <TouchableOpacity onPress={()=>{handleNavigation()}}  style={{height:150,width:'28%',margin:8,borderTopLeftRadius:100,borderTopRightRadius:100,borderBottomRightRadius:10,borderBottomLeftRadius:10,backgroundColor:backgroundColor,alignItems:"center",justifyContent:"flex-start",borderWidth:0.4,borderColor:borderColor}}>
            <View style={{height:80,width:80,borderRadius:40,backgroundColor:"white",alignItems:"center",justifyContent:"center",marginBottom:10,marginTop:10}}>
                <Image style={{height:80,width:80,resizeMode:'contain'}} source={image}></Image>
            </View>
            <PoppinsTextMedium style={{fontSize:fontSize,fontWeight:fontWeight,color:'black'}} content={text}></PoppinsTextMedium>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default DashboardSupportBox;
