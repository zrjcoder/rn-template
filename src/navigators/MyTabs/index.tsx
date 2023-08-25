import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Profile,
  Password,
  Update,
  Car,
  Idcard,
  Feedback,
  Contact,
  Filter,
} from '@/screens'

import { headerStyles } from '../common'

const Tab = createNativeStackNavigator()

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: '个人信息',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          headerTitle: '警务通讯录',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="Idcard"
        component={Idcard}
        options={{
          headerTitle: '身份证识别',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="Car"
        component={Car}
        options={{
          headerTitle: '车辆查询',
          ...headerStyles,
        }}
      />

      <Tab.Screen
        name="Filter"
        component={Filter}
        options={{
          headerTitle: '消息过滤器',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="Password"
        component={Password}
        options={{
          headerTitle: '修改密码',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="Update"
        component={Update}
        options={{
          headerTitle: '检查更新',
          ...headerStyles,
        }}
      />
      <Tab.Screen
        name="Feedback"
        component={Feedback}
        options={{
          headerTitle: '意见反馈',
          ...headerStyles,
        }}
      />
    </Tab.Navigator>
  )
}
