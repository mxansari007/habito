import { 
  View, 
  Text,
  StyleSheet
 } from 'react-native'
import React, { useContext, useState } from 'react'
import MyInput from '../components/MyInput'
import MyButton from '../components/MyButton'
import {AppwriteContext} from '../appwrite/AppwriteContext'

type UserAccount = {
  $id:string,
  $createdAt:Date,
  expire:Date,
  phrase:string,
  secret:string,
  userId:string,
};

export default function CreateAccount({navigation}) {

  const [step, setStep] = useState(1) // 1 for phone number, 2 for OTP, 3 for Name
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const {appwrite} = useContext(AppwriteContext)
  const [userAccount, setUserAccount] = useState<UserAccount>();
  const [token, setToken] = useState<string>('');
  const handleSubmit =  () =>{
    console.log('clicked')
    appwrite.createRecord({phone,name}).then((r)=>setUserAccount(r))
    .catch(e=>console.log(e));
    setStep(2);
  }

  const handleVerifyOtp = () =>{
    console.log(userAccount);
    console.log('clicked')
    if(userAccount){
    appwrite.verifyOTP({UserAccount:userAccount,otp:otp}).then(d=>console.log(d))
    .catch(e=>console.log(e));
    }else{
      console.log('User Account not found')
    }

  }

  
  return (
<>
  {step === 1 ? (
    <View style={styles.container}>
      <Text style={styles.headingTxt}>Create Account</Text>
      <View style={styles.inputArea}>
        <MyInput keyboardType="text" onChangeText={(e) => setName(e)} placeholder="Name" />
        {/* Consider handling the phone number prefix outside of the onChangeText if needed */}
        <MyInput keyboardType="numeric" onChangeText={(e) => setPhone('+91'+e)} placeholder="Phone Number" />
        <MyButton onPress={handleSubmit} title="Create Account" />
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.headingTxt}>Verify OTP</Text>
      <View style={styles.inputArea}>
        <MyInput keyboardType="numeric" onChangeText={(e) => setOtp(e)} placeholder="OTP" />
        <MyButton onPress={handleVerifyOtp} title="Verify OTP" />
      </View>
    </View>
  )}
</>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  headingTxt:{
    fontSize:30,
    textAlign:'center',
    marginTop:20,
    fontFamily:'Quicksand-Bold'
  },
  inputArea:{
    flex:1/2,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    paddingHorizontal:20
  }

})