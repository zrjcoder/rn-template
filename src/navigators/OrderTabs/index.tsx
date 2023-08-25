import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  TogetherAgainFeedback,
  TogetherRead,
  TogetherReceive,
  TogetherFeedback,
  RunFeedback,
  RunReceive,
  WarningFeedback,
  WarningReceive,
  PersonnelFeedback,
  PersonnelReceive,
} from '@/screens'

import { headerStyles } from '../common'

const Tab = createNativeStackNavigator()

export function OrderTabs() {
  return (
    <Tab.Navigator>
      {/* --------------------  合作作战 -------------------- */}
      <Tab.Screen
        name="TogetherAgainFeedback"
        component={TogetherAgainFeedback}
        options={{
          headerTitle: '指令详情',
          // headerTitle: '合作作战再次反馈',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="TogetherRead"
        component={TogetherRead}
        options={{
          headerTitle: '指令详情',
          // headerTitle: '合作组织领导批阅',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="TogetherReceive"
        component={TogetherReceive}
        options={{
          headerTitle: '指令详情',
          // headerTitle: '合作作战接警',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="TogetherFeedback"
        component={TogetherFeedback}
        options={{
          headerTitle: '指令详情',
          // headerTitle: '合作作战反馈',
          ...headerStyles,
        }}
      />
      {/* --------------------  重点人员 -------------------- */}
      <Tab.Screen
        name="PersonnelFeedback"
        component={PersonnelFeedback}
        options={{
          headerTitle: '指令详情',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="PersonnelReceive"
        component={PersonnelReceive}
        options={{
          headerTitle: '指令详情',
          ...headerStyles,
        }}
      />
      {/* --------------------  智能预警指令 -------------------- */}
      <Tab.Screen
        name="WarningFeedback"
        component={WarningFeedback}
        options={{
          headerTitle: '指令详情',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="WarningReceive"
        component={WarningReceive}
        options={{
          headerTitle: '指令详情',
          ...headerStyles,
        }}
      />
      {/* --------------------  在逃人员 -------------------- */}
      <Tab.Screen
        name="RunFeedback"
        component={RunFeedback}
        options={{
          headerTitle: '指令详情',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="RunReceive"
        component={RunReceive}
        options={{
          headerTitle: '指令详情',
          ...headerStyles,
        }}
      />
    </Tab.Navigator>
  )
}
