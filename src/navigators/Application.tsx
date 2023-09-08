import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MainTabs, incidentTabs, myTabs, orderTabs } from './index'
import { Login, Message } from '@/screens'
import { Map } from '@/components/Map'
import { RootStackParamList } from './types'
import { Header } from './components/Header'

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
            header: Header,
          }}>
          <RootStack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />

          {incidentTabs.map(({ name, component, options }) => (
            <RootStack.Screen
              key={name}
              name={name as any}
              component={component}
              options={{ headerShown: true, ...options }}
            />
          ))}

          {myTabs.map(({ name, component, options }) => (
            <RootStack.Screen
              key={name}
              name={name as any}
              component={component}
              options={{ headerShown: true, ...options }}
            />
          ))}

          {orderTabs.map(({ name, component, options }) => (
            <RootStack.Screen
              key={name}
              name={name as any}
              component={component}
              options={{ headerShown: true, ...options }}
            />
          ))}

          <RootStack.Screen name="Map" component={Map as any} />

          <RootStack.Screen
            name="Login"
            component={Login as any}
            options={{ headerShown: false }}
          />

          <RootStack.Screen
            name="Message"
            component={Message as any}
            options={{
              headerShown: true,
              headerTitle: '消息通知',
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
