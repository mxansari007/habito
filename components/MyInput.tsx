import { View, Text,TextInput,StyleSheet } from 'react-native'
import React from 'react'

export default function MyInput({placeholder,keyboardType,onFocus,onBlur,ref,onChangeText,isFocused,style}:any) {



  return (
    <>
    <TextInput
    style={[styles.Input,{borderBottomColor:isFocused?'#8860D0':'black'},style]} 
    onChangeText={onChangeText}
    placeholder={placeholder}
    keyboardType={keyboardType}
    onFocus={onFocus}
    onBlur={onBlur}
    ref={ref}
    />
    </>
  )
}


const styles = StyleSheet.create({
    Input:{
        marginTop:20,
        borderBottomWidth:2,
        paddingHorizontal:10,
      },

})