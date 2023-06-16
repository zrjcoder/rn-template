import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MainTabs } from './MainTabs'
import { Login } from '../screens/Login'
import { Map } from '../components/Map'
import { RootStackParamList } from './types'

const ApplicationNavigator = () => {
  const navigationRef = useNavigationContainerRef()
  const RootStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={'light-content'} />
        <RootStack.Navigator>
          <RootStack.Screen name="Login" component={Login as any} />
          <RootStack.Screen name="Map" component={Map as any} />
          <RootStack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
