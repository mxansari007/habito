import { 
  View, 
  Text,
  StyleSheet,
  Image,
  TextInput,
  TextInputProps,
  Pressable
} from 'react-native'
import React,{useRef,useState,useContext, useEffect} from 'react'
import habitImage from '../assets/images/arrows.png';
import MyInput from '../components/MyInput';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {

  const phoneRef = useRef<TextInputProps | undefined>();
  const [isPhoneFocused,setPhoneFocused] = useState<boolean>(false);
  const [isOtp,setIsOtp] = useState<boolean>(false);
  const [step,setStep] = useState<number>(1);
  const [phone,setPhone] = useState<string>('');
  const [otp,setOtp] = useState<string>('');
  const {appwrite} = useContext(AppwriteContext);
  const [userId,setUserId] = useState<string>('');

  useEffect(()=>{
    setStep(1);
  }
  ,[]);




  const changeNumber =(e:string)=>{
    setPhone('+91'+e);
  }

  const changeOtp =(e:string)=>{
    setOtp(e);
  }

  const handleLogin = ()=>{
    appwrite.createMySession({otp,userId})
    .then(async (r)=>{
      console.log(r)
      await AsyncStorage.setItem('User',JSON.stringify(r));
      navigation.replace('Dashboard');
    
    })
    .catch(e=>console.log(e));
  }

  const handleOTP = ()=>{
    appwrite.checkUser(phone).then((r)=>{
      console.log(r);
      if(r?.documents.length==0){
        setUserId(r?.documents[0].userId);
        Snackbar.show({
          text:'User not found',
          duration:Snackbar.LENGTH_LONG,
          backgroundColor:'#8860D0'
        })
      }
      else{
        appwrite.createRecord({phone}).then((r)=>console.log(r))
        setStep(2);
      }
    }).catch(e=>console.log(e));

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
     
     {step===1?<TextInput
        style={[styles.phoneInput,{borderBottomColor:isPhoneFocused?'#8860D0':'black'}]} 
        onChangeText={changeNumber}
        placeholder='Enter Your Phone Number'
        keyboardType='numeric'
        onFocus={()=>setPhoneFocused(true)}
        onBlur={()=>setPhoneFocused(false)}
        ref={phoneRef}
        />:null}

        {step===2?<MyInput 
        placeholder="Enter OTP" 
        onChangeText={changeOtp}
        isFocused={isOtp}
        onFocus={()=>setIsOtp(true)}
        onBlur={()=>setIsOtp(false)}
        keyboardType="numeric"
        secureTextEntry={true}
        style={styles.optInput}
        />:null}



{step===1?<Pressable style={styles.loginBtn}
          onPress={()=>handleOTP()}
        >
          <Text style={styles.loginBtnTxt}>Send OTP</Text>
        </Pressable>:null}

{step===2?<Pressable style={styles.loginBtn}
          onPress={()=>handleLogin()}
        >
          <Text style={styles.loginBtnTxt}>Login</Text>
        </Pressable>:null}

        <Text  style={styles.createAccountTxt}>Create your Account 
            <Text
            onPress={()=>navigation.push('CreateAccount')}
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
  width:'80%',
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

},
optInput:{
 width:'80%'
},
  
})


