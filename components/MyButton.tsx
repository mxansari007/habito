import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity 
} from 'react-native'
import React from 'react'

export default function MyButton({style,onPress,title,textStyle}:any) {
  return (
    <>
    <TouchableOpacity style={[styles.loginBtn,style]}
          onPress={onPress}
        >
          <Text style={[styles.loginBtnTxt,textStyle]}>{title}</Text>
        </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
    loginBtn:{
        marginTop:40,
        borderWidth:2,
        paddingHorizontal:40,
        paddingVertical:10,
        width:'50%',
        alignItems:'center',
        borderRadius:5,
        borderColor:'#8860D0',
        backgroundColor:'#8860D0'
      },
      loginBtnTxt:{
        color:'white'
      },
    })