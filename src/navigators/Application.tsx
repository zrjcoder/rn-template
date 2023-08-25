import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MainTabs, IncidentTabs, MyTabs, OrderTabs } from './index'
import { Login } from '@/screens/Login'
import { Map } from '@/components/Map'
import { RootStackParamList } from './types'

const ApplicationNavigator = () => {
  const navigationRef = useNavigationContainerRef()
  const RootStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar animated={true} backgroundColor="#266EFF" barStyle={'light-content'} />
        <RootStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            animation: 'slide_from_right',
            presentation: 'card',
          }}>
          <RootStack.Screen
            name="Login"
            component={Login as any}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="Map" component={Map as any} />

          <RootStack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />

          <RootStack.Screen
            name="IncidentTabs"
            component={IncidentTabs}
            options={{ headerShown: false }}
          />

          <RootStack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />

          <RootStack.Screen
            name="OrderTabs"
            component={OrderTabs}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
