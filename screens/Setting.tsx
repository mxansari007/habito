import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'

const Setting = ({navigation}) => {

  console.log(navigation)

  return (
    <View style={styles.container}>
      <Text>Setting</Text>
      <Navbar />
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative'
    }
})