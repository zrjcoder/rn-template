import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, My } from '../screens'
import { MainTabsParamList } from './types'

const Tab = createBottomTabNavigator<MainTabsParamList>()

export function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '首页',
          headerTitle: '首页',
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          headerTitle: '我的',
          tabBarLabel: '我的',
        }}
      />
    </Tab.Navigator>
  )
}
