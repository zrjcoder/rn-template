import 'react-native-gesture-handler'

import React from 'react'
import ApplicationNavigator from '@/navigators/Application'
import { Provider } from 'react-redux'
import { NativeBaseProvider } from 'native-base'
import { PersistGate } from 'redux-persist/lib/integration/react'

import { store, persistor } from './store'

const App = () => {
  return (
    <NativeBaseProvider>
      <ApplicationNavigator />
    </NativeBaseProvider>
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <NativeBaseProvider>
    //       <ApplicationNavigator />
    //     </NativeBaseProvider>
    //   </PersistGate>
    // </Provider>
  )
}

export default App
