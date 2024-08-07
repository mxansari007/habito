import { 
    View, 
    Text,
    StyleSheet,
    Image, 
    Pressable
} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import Vec1 from '../assets/images/Vector1.png';
import Vec2 from '../assets/images/Vector2.png';
import { useNavigation } from '@react-navigation/native';


const AddIcon = ({name,active}:{name:string,active:boolean})=>{

    return(
        <>
        <Icon name={name} size={20} color={active?'white':'#C1B5D7'}/> 
        </>
    )
}



export default function Navbar({route}:{route:string}) {

  const navigation = useNavigation();
  const [option,setOption] = useState(1);

  
  return (
    <View style={styles.navContainer}>
    <View style={styles.innerContainer}>
    <View style={styles.outerBtn}>
      <Pressable onPress={()=>{
        setOption(1);
        navigation.navigate('Dashboard');
      }} style={[styles.Btn,route==="Dashboard"?styles.BtnActive:{}]}>
        <AddIcon name="home" active={route==="Dashboard"?true:false} />
      </Pressable>
      <Image style={{position:'absolute',top:7,left:76,zIndex:-1}} source={Vec1} />
      <Image style={{position:'absolute',bottom:7,left:76}} source={Vec2} />
      </View>
      <View style={[styles.outerBtn,styles.outerRelative]}>
      <Pressable style={[styles.Btn,route===""?styles.BtnActive:{}]}>
        <AddIcon name="book" active={route===""?true:false} />
      </Pressable>
      </View>
      <View style={[styles.outerBtn,styles.outerRelative2]}>
      <Pressable 
      onPress={()=>{
        setOption(3);
        navigation.navigate('Setting');
      }}
      style={[styles.Btn,route==="Setting"?styles.BtnActive:{}]}>
        <AddIcon name="settings" active={route==="Setting"?true:false} />
      </Pressable>
      <Image style={{position:'absolute',top:10,right:76}} source={Vec1} />
      <Image style={{position:'absolute',bottom:10,right:76}} source={Vec2} />
      </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    navContainer:{
        position:'absolute',
        bottom:40,
        left:'20%',
        height:80,
        width:'60%',
        zIndex:1000

    },
    innerContainer:{
        flexDirection:'row',
        position:'relative'
    },
    Btn:{
        borderRadius:100,
        width:80,
        height:80,
        alignItems:'center',
        backgroundColor:'white',
        justifyContent:'center',
 
    },
    BtnActive:{
        backgroundColor:'#8860D0',
        zIndex:1000
    },
    outerBtn:{
        backgroundColor:'white',
        padding:10,
        borderRadius:50,
        zIndex:100
    },
    outerRelative:{
        position:'relative',
        left:-20,
        zIndex:-1
    },
    outerRelative2:{
        position:'relative',
        left:-30,
        zIndex:-1
    },


})