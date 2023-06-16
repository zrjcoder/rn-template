import React from 'react'
import ApplicationNavigator from '@/navigators/Application'
import { NativeBaseProvider } from 'native-base'

const App = () => {
  return (
    <NativeBaseProvider>
      <ApplicationNavigator />
    </NativeBaseProvider>
  )
}

export default App
