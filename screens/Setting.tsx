import { StyleSheet, Text, View } from 'react-native'
import React,{useContext} from 'react'
import Navbar from '../components/Navbar'
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/Feather';
import AppwriteContext from '../appwrite/AppwriteContext';

const AddIcon = ({name}:{name:string})=>{

  return(
      <>
      <Icon name={name} size={20} color='#040070'/> 
      </>
  )
}


const Setting = ({navigation}) => {

  const route = useRoute();
  console.log(route);
  const {appwrite} = useContext(AppwriteContext);

  const handleLogout = ()=>{
    appwrite.deleteSession().then(()=>{
      navigation.navigate('Home');
    }).catch(e=>console.log(e));
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Navbar route ={route.name}/>
      <View style={styles.options}>
        <View style={styles.option}><Text style={styles.opt}>Option 1 </Text><AddIcon name="chevron-right"/></View>
        <View style={styles.option}><Text style={styles.opt}>Option 2 </Text><AddIcon name="chevron-right"/></View>
        <Text onPress={()=>handleLogout()} style={styles.logout}>Logout</Text>
      </View>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        backgroundColor:'#E1D9F0'
    },
    heading:{
        fontFamily:'Quicksand-Bold',
        fontSize:30,
        color:'black',
        paddingHorizontal:20,
        paddingVertical:40,
        color:'#040070'
    },
    option:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'white',
        marginHorizontal:20,
        borderRadius:10,
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',

    },
    opt:{
        fontFamily:'Quicksand-Bold',
        color:'#040070'
    },
    logout:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'white',
        marginHorizontal:20,
        borderRadius:10,
        marginTop:20,
        flexDirection:'column',
        color:'#040070',
        textAlign:'center',
        fontFamily:'Quicksand-Bold',
    },
})