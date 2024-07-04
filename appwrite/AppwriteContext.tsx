import { View, Text } from 'react-native'
import React, { createContext } from 'react'

import Appwrite from './service'

type AppwriteContextType = {
    appwrite: Appwrite
}


export const AppwriteContext = createContext<AppwriteContextType>({
    appwrite: new Appwrite()
})

export const AppwriteProvider = ({children}) => {
    
    const defaultValue = {
        appwrite: new Appwrite()
    }


  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  )
}

export default AppwriteContext

