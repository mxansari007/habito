import { 
  View,
  Text,
  StyleSheet,
  ScrollView
 } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import CheckBox from '@react-native-community/checkbox';
import Navbar from '../components/Navbar';

function AddIcon(){

  return (
    <>
    <Icon  name="plus-square" size={30} color="gray" />
    </>
  )
}

export default function Dashboard() {

  const [checkState,setCheckState] = useState(false);

  return (
    <>
      <View  style={styles.container}>
      <ScrollView>
      <Text style={styles.habitsHeading}>Habits <AddIcon /></Text>
      <View style={styles.progressBar}>
      <Progress.Bar color='#8860D0' unfilledColor='white' borderRadius={10} progress={0.3} width={350} height={15} />
      <View style={styles.progressInfo}>
      <Text style={styles.progressInfoTxt}>30% completed</Text>
      </View>
      </View>
      <View style={styles.tasks}>
        <View style={[styles.task,styles.taskBorder]}>
            <CheckBox
              value={checkState}
              onValueChange={()=>{setCheckState(prev=>!prev)}}
              style={styles.checkBox}
              tintColors={{true:'#8860D0',false:'#8860D0'}}
            />
            <Text>Read Books</Text>
        </View>
        <View style={styles.task}>
            <CheckBox
              value={checkState}
              onValueChange={()=>{setCheckState(prev=>!prev)}}
              style={styles.checkBox}
              tintColors={{true:'#8860D0',false:'#8860D0'}}
            />
            <Text>Read Books</Text>
        </View>
      </View>
      <View style={styles.completedTasks}>
        <Text>Completed</Text>
          <View style={[styles.task,styles.taskBorder]}>
              <CheckBox
                value={!checkState}
                onValueChange={()=>{setCheckState(prev=>!prev)}}
                style={styles.checkBox}
                tintColors={{true:'#8860D0',false:'#8860D0'}}
              />
              <Text>Read Books</Text>
          </View>
          <View style={styles.task}>
              <CheckBox
                value={!checkState}
                onValueChange={()=>{setCheckState(prev=>!prev)}}
                style={styles.checkBox}
                tintColors={{true:'#8860D0',false:'#8860D0'}}
              />
              <Text>Read Books</Text>
          </View>
        </View>
      </ScrollView>
      <Navbar />
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  habitsHeading:{
    fontFamily:'Quicksand-Bold',
    fontSize:30,
    color:'black',
    paddingHorizontal:20,
    paddingVertical:40
  },
  container:{
    position:'relative',
    backgroundColor:'#E1D9F0',
    flex:1
  },
  progressBar:{
    width:'100%',
    alignItems:'center'
  },
  progressInfo:{
    width:'80%',
    marginTop:10,
    alignItems:'flex-end'

  },
  progressInfoTxt:{
    fontFamily:'Quicksand-SemiBold',
    color:'#040070',
  },
  checkBox:{
  
  },
  tasks:{
    alignItems:'flex-start',
    backgroundColor:'white',
    padding:20,
    margin:20,
    borderRadius:20
  },
  task:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    padding:10
  },
  taskBorder:{
    width:'100%',
    borderBottomWidth:1,
    borderBottomColor:'#D4D4D4'
  },
  completedTasks:{
    padding:20,
    margin:20,
  }


})