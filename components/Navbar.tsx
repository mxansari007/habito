import { 
    View, 
    Text,
    StyleSheet,
    Image 
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import Vec1 from '../assets/images/Vector1.png';
import Vec2 from '../assets/images/Vector2.png';

const AddIcon = ({name,active}:{name:string,active:boolean})=>{

    return(
        <>
        <Icon name={name} size={20} color={active?'white':'#C1B5D7'}/> 
        </>
    )
}



export default function Navbar() {
  return (
    <View style={styles.navContainer}>
    <View style={styles.innerContainer}>
    <View style={styles.outerBtn}>
      <View style={[styles.Btn,true?styles.BtnActive:{}]}>
        <AddIcon name="home" active={true} />
      </View>
      <Image style={{position:'absolute',top:7,left:76}} source={Vec1} />
      <Image style={{position:'absolute',bottom:7,left:76}} source={Vec2} />
      </View>
      <View style={[styles.outerBtn,styles.outerRelative]}>
      <View style={[styles.Btn,false?styles.BtnActive:{}]}>
        <AddIcon name="book" active={false} />
      </View>
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
        justifyContent:'center'
    },
    BtnActive:{
        backgroundColor:'#8860D0'
    },
    outerBtn:{
        backgroundColor:'white',
        padding:10,
        borderRadius:50
    },
    outerRelative:{
        position:'relative',
        left:-10,
        zIndex:-1
    }
})