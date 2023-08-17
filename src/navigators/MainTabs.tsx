/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { IImageProps, Image } from 'native-base'
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import { Home, My, Order, Work } from '../screens'
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

const tabBarLabelStyle = {
  marginTop: -5,
  marginBottom: 4,
}

export function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="My">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '警情',
          headerTitle: '警情',
          ...headerStyles,
          tabBarLabelStyle,
          headerRight: HeaderButton,
          tabBarIcon: ({ focused, size }) =>
            focused ? (
              <TabBarIcon
                size={size}
                source={require('@/assets/tab/police-active.png')}
              />
            ) : (
              <TabBarIcon size={size} source={require('@/assets/tab/police.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          headerTitle: '指令',
          tabBarLabel: '指令',
          ...headerStyles,
          tabBarLabelStyle,
          tabBarIcon: ({ focused, size }) =>
            focused ? (
              <TabBarIcon size={size} source={require('@/assets/tab/order-active.png')} />
            ) : (
              <TabBarIcon size={size} source={require('@/assets/tab/order.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="Work"
        component={Work}
        options={{
          headerTitle: '工作台',
          tabBarLabel: '工作台',
          ...headerStyles,
          tabBarLabelStyle,
          tabBarIcon: ({ focused, size }) =>
            focused ? (
              <TabBarIcon size={size} source={require('@/assets/tab/work-active.png')} />
            ) : (
              <TabBarIcon size={size} source={require('@/assets/tab/work.png')} />
            ),
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{
          headerTitle: '我的',
          tabBarLabel: '我的',
          ...headerStyles,
          tabBarLabelStyle,
          tabBarIcon: ({ focused, size }) =>
            focused ? (
              <TabBarIcon size={size} source={require('@/assets/tab/my-active.png')} />
            ) : (
              <TabBarIcon size={size} source={require('@/assets/tab/my.png')} />
            ),
        }}
      />
    </Tab.Navigator>
  )
}

function TabBarIcon({ source, ...props }: { source: any } & IImageProps) {
  return <Image source={source} size="5" resizeMode="contain" alt="icon" {...props} />
}
