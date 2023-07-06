import React from 'react'
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import { Home, My } from '../screens'
import { MainTabsParamList } from './types'
import { HeaderButton } from './IncidentTabs/HeaderButton'

const Tab = createBottomTabNavigator<MainTabsParamList>()

const headerStyles: BottomTabNavigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#266EFF',
    height: 40,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 20,
    paddingBottom: 5,
  },
}

export function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '警情',
          headerTitle: '警情',
          ...headerStyles,
          headerRight: HeaderButton,
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          headerTitle: '我的',
          tabBarLabel: '我的',
          ...headerStyles,
        }}
      />
    </Tab.Navigator>
  )
}
