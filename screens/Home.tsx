import { 
  View, 
  Text,
  StyleSheet,
  Image,
  TextInput,
  TextInputProps,
  Pressable
} from 'react-native'
import React,{useRef,useState} from 'react'
import habitImage from '../assets/images/arrows.png';


export default function Home({navigation}) {

  const phoneRef = useRef<TextInputProps | undefined>();
  const [isPhoneFocused,setPhoneFocused] = useState<boolean>(false);


  const changeNumber =()=>{
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headingText}>Welcome Back</Text>
      <Text style={styles.subHeadingText}>Login to Continue.</Text>
      </View>
      <View style={styles.logo}>
      <Image source={habitImage} style={styles.logoImage}/>
      <Text style={styles.logoText}>Habit Tracker</Text>
      </View>
      <View style={styles.inputs}>
      <TextInput
        style={[styles.phoneInput,{borderBottomColor:isPhoneFocused?'#8860D0':'black'}]} 
        onChangeText={changeNumber}
        placeholder='Enter Your Phone Number'
        keyboardType='numeric'
        onFocus={()=>setPhoneFocused(true)}
        onBlur={()=>setPhoneFocused(false)}
        ref={phoneRef}
        />

        <Pressable style={styles.loginBtn}
          onPress={()=>navigation.push('Dashboard')}
        >
          <Text style={styles.loginBtnTxt}>Login</Text>
        </Pressable>

        <Text  style={styles.createAccountTxt}>Create your Account 
            <Text
            style={{color:'#8860D0'}}> Click Here</Text>
          </Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
  },
  headingText:{
    fontFamily:'Quicksand-Bold',
    fontSize:28,
    color:'black',
    paddingHorizontal:20,
    marginTop:20
  },

  subHeadingText:{
    fontFamily:'Quicksand-SemiBold',
    fontSize:20,
    paddingHorizontal:20
  },

  logo:{
    marginTop:100,
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  logoImage:{
    height:150,
    width:150
  },
logoText:{
  fontFamily:'Quicksand-Bold',
  fontSize:30,
},
phoneInput:{
  marginTop:20,
  borderBottomWidth:2,
  paddingHorizontal:10,
},
inputs:{
  marginTop:80,
  alignItems:'center'
},

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
createAccountTxt:{
  marginTop:20,

}
  
})


