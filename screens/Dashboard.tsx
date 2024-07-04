import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
  Touchable,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
 } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';
import CheckBox from '@react-native-community/checkbox';
import Navbar from '../components/Navbar';
import Modal from "react-native-modal";
import MyInput from '../components/MyInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Habit = {
  habitId:number,
  habitName:String,
  completed:boolean,
  date:String
}


function AddIcon({onPress}:{onPress:()=>void}){

  return (
    <>
    <TouchableOpacity onPress={onPress}>
    <Icon  name="plus-square" size={30} color="gray" />
    </TouchableOpacity>
    </>
  )
}

export default function Dashboard() {




  const [checkState,setCheckState] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused,setFocused] = useState(false);
  const [habit,setHabit] = useState<String>('');
  const [habits,setHabits] = useState<Array<Object>>([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(()=>{
    ;(async ()=>{
      try {
        const value = await AsyncStorage.getItem('habits')
        if(value !== null) {
          // value previously stored
          setHabits(JSON.parse(value));
        }
      } catch(e) {
        // error reading value
        console.log(e);
      }
    })()

  },[])


  const storeData = async (value: Array<Object>) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('habits', jsonValue)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }


  const addHabits = ()=>{
    const date = new Date();
    setHabits([...habits,{habitId:habits.length,habitName:habit,completed:false,date:date.toLocaleDateString()}]);
    storeData([...habits,{habitId:habits.length,habitName:habit,completed:false,date:date.toLocaleDateString()}]);
    toggleModal();
  }


  const changeHabitState = (id:number)=>{
    const newHabits = habits.map((d,i)=>{
      if(i===id){
        return {...d,completed:!d.completed}
      }
      return d;
    })
    setHabits(newHabits);
    storeData(newHabits);
  }


  return (
    <>
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding':'height'} style={styles.container}>
      <Text style={styles.habitsHeading}>Habits <AddIcon onPress={toggleModal} /></Text>
      <View style={styles.progressBar}>
      <Progress.Bar color='#8860D0' unfilledColor='white' borderRadius={10} progress={0.3} width={350} height={15} />
      <View style={styles.progressInfo}>
      <Text style={styles.progressInfoTxt}>30% completed</Text>
      </View>
      </View>
      <ScrollView style={{maxHeight:300,borderRadius:20,marginTop:20}}>
      <View style={styles.tasks}>
        {(habits.filter(x=>!x.completed)).map((d)=><View key={d.habitId} style={[styles.task,styles.taskBorder]}>
            <CheckBox
              value={d.completed}
              onValueChange={()=>{changeHabitState(d.habitId)}}
              style={styles.checkBox}
              tintColors={{true:'#8860D0',false:'#8860D0'}}
            />
            <Text>{d.habitName}</Text>
        </View>)}
      </View>
      </ScrollView>
        <Text style={styles.headingTxt}>Completed</Text>
      <ScrollView style={{maxHeight:200}}>
      <View style={styles.completedTasks}>
          {(habits.filter(x=>x.completed)).map((d)=><View keys={d.habitId} style={[styles.task,styles.taskBorder]}>
              <CheckBox
                value={d.completed}
                onValueChange={()=>{setCheckState(prev=>!prev)}}
                style={styles.checkBox}
                tintColors={{true:'#8860D0',false:'#8860D0'}}
              />
              <Text>{d.habitName}</Text>
          </View>)}
        </View>
        </ScrollView>
      <Navbar />
      </KeyboardAvoidingView>
      <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeading}>Add Habit</Text>
              <MyInput 
              style={styles.modalInput} 
              onFocus={()=>setFocused(true)}
              onBlur={()=>setFocused(false)}
              isFocused={isFocused}
              onChangeText={(text:String)=>setHabit(text)}
              />
              <View style={styles.modalButtons}>
              <Button title="Add" onPress={addHabits} />
              <Button title="Close" onPress={toggleModal} />
              </View>
          </View>
      </Modal>
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
  },
  modalContainer:{
    backgroundColor:'white',
    padding: 20, 
    borderRadius: 20
  },
  modalHeading:{
    fontFamily:'Quicksand-Bold',
    fontSize:20,
    color:'black',
    marginBottom:20
  },
  modalInput:{
    borderBottomWidth:2,
    paddingHorizontal:10,
    paddingVertical:10,
    marginBottom:20
  },
  modalButtons:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  btn:{
    padding:10,
    borderRadius:5,
    backgroundColor:'#8860D0',
    color:'white'
  },
  headingTxt:{
    fontFamily:'Quicksand-Bold',
    fontSize:20,
    color:'black',
    paddingHorizontal:20,
    marginTop:10
  }
})