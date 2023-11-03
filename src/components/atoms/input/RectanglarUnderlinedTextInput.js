
import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Text,Image,TouchableOpacity,TextInput, KeyboardAvoidingView} from 'react-native';
import PoppinsTextMedium from '../../electrons/customFonts/PoppinsTextMedium';

const RectanglarUnderlinedTextInput = (props) => {
    const [input ,setInput] = useState(props.value)
    const title = props.title
    const placeHolder = props.placeHolder
    const maxLength = props.maxLength
    const label = props.label
    useEffect(()=>{
        props.handleData(props.value,title)
    },[props.value])
    useEffect(()=>{
        props.handleData(input,title)
    },[props.pressedSubmit])
    const handleTextInput=(data,title)=>{
        setInput(data)
        props.handleData(data,title)
    }    
    return (
        <View style={{backgroundColor:"white",width:'90%',borderBottomWidth:1,borderColor:'#DDDDDD',alignItems:"flex-start",justifyContent:'center',marginTop:6}}>
           
            <PoppinsTextMedium content={label} style={{color:"#818181",fontSize:18,marginBottom:4,fontWeight:"600",marginLeft:14}}></PoppinsTextMedium>
            <TextInput maxLength={maxLength} value={input} onChangeText={(inp)=>{
                setInput(inp)
            }} onEndEditing={()=>{
                handleTextInput(input,title)
            }} onSubmitEditing={()=>{
                handleTextInput(input,title)

            }} placeholder={placeHolder} style={{width:'100%',height:40,fontWeight:'400',color:'black',marginLeft:10,fontSize:16}}>
                
            </TextInput>
        </View>
    );
}

const styles = StyleSheet.create({})

export default RectanglarUnderlinedTextInput;
