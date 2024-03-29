import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import PoppinsTextMedium from '../../electrons/customFonts/PoppinsTextMedium';
const TextInputNumericRectangle = props => {
  const [value, setValue] = useState(props.value);
  const placeHolder = props.placeHolder;
  const maxLength = props.maxLength;
  const label = props.label
  const required = props.required
  const isEditable = props.isEditable
  console.log("label",isEditable)

  useEffect(()=>{
    if(props.value!==undefined)
    {
      let tempJsonData = {...props.jsonData, value: props.value};
      console.log(tempJsonData);
      props.handleData(tempJsonData);
    }

  },[props.value])

  const handleInput = text => {
    setValue(text);
  };
  const handleInputEnd = () => {
    let tempJsonData = {...props.jsonData, value: value};
    console.log(tempJsonData);
    props.handleData(tempJsonData);
  };

  return (
    <View
      style={{
        height: 50,
        width: '86%',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 10,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          position: 'absolute',
          top: -15,
          left: 16,
        }}>
        <PoppinsTextMedium
          style={{color: '#919191', padding: 4,fontSize:18}}
          content={label}></PoppinsTextMedium>
      </View>
      <TextInput
        maxLength={maxLength}
        onEndEditing={text => {
          handleInputEnd();
        }}
        keyboardType="numeric"
        style={{
          height: 50,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          fontWeight: '500',
          marginLeft: 20,
          color:'black',fontSize:16
        }}
        editable = {isEditable}
        placeholderTextColor="grey"
        onChangeText={text => {
          handleInput(text);
        }}
        value={value}
        placeholder={required ? `${placeHolder} *` : `${placeHolder}`}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TextInputNumericRectangle;