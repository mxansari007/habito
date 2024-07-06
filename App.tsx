import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  useColorScheme,
  ScrollView
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Dashboard from './screens/Dashboard'
import CreateAccount from './screens/CreateAccount'
import {AppwriteContext} from './appwrite/AppwriteContext.tsx';

type RootStackParamList = {
  Home: undefined
}
import { User } from 'realm'
const Stack = createNativeStackNavigator<RootStackParamList>()

const App = ():JSX.Element =>{

  const isDarkMode = useColorScheme() === 'dark'
  const {appwrite}= useContext(AppwriteContext)


  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'> 

      <Stack.Screen 
      name="Home" 
      component={Home} 
      options={{headerShown:false}}
      />

      <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{headerShown:false}}
      />

      <Stack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{headerShown:false}}
      />

      </Stack.Navigator>
    </NavigationContainer>
  )
}




export default App;