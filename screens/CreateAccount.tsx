import { 
  View, 
  Text,
  StyleSheet
 } from 'react-native'
import React, { useContext, useState } from 'react'
import MyInput from '../components/MyInput'
import MyButton from '../components/MyButton'
import {AppwriteContext} from '../appwrite/AppwriteContext'



export default function CreateAccount() {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const {appwrite} = useContext(AppwriteContext)
  
  const handleSubmit =  () =>{
    console.log('clicked')
    appwrite.createRecord({name,phone}).then(d=>console.log(d))
    .catch(e=>console.log(e));


  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.headingTxt}>Create Account</Text>
      <View style={styles.inputArea}>
      <MyInput keyboardType="text" onChangeText={(e)=>setName(e)} placeholder="Name" />
      <MyInput keyboardType="numeric" onChangeText={(e)=>{setPhone('+91'+e)}} placeholder="Phone Number" />
      <MyButton onPress={handleSubmit} title="Create Account" />
      </View>
    </View>
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