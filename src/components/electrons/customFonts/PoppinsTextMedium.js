import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

const PoppinsTextMedium = (props) => {

    const content=props.content 
    const style = props.style
    return (
        <Text style={{...style,fontFamily:'RobotoSerif-VariableFont_GRAD,opsz,wdth,wght',textAlign:"center"}}>
            {content}
        </Text>
    );
}

const styles = StyleSheet.create({})

export default PoppinsTextMedium;
