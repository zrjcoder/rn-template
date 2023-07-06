import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Scene, Case, Detail, Message } from '@/screens'

import { headerStyles } from '../common'

const Tab = createNativeStackNavigator()

export function IncidentTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Scene"
        component={Scene}
        options={{
          headerTitle: '出警中',
          ...headerStyles,
        }}
      />

      <Tab.Screen
        name="Case"
        component={Case}
        options={{
          headerTitle: '案件处置',
          ...headerStyles,
        }}
      />

      <Tab.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitle: '警情详情',
          ...headerStyles,
        }}
      />

      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          headerTitle: '消息提醒',
          ...headerStyles,
        }}
      />
    </Tab.Navigator>
  )
}
