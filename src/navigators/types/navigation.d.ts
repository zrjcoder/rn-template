import type { NavigatorScreenParams } from '@react-navigation/native'
import type { ForwardedTabScreenProps } from 'react-navigation-props-mapper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { IncidentTabsParamList, MyTabsParamList, OrderTabsParamList } from '../index'

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>
  IncidentTabs: NavigatorScreenParams<IncidentTabsParamList>
  OrderTabs: NavigatorScreenParams<OrderTabsParamList>
  MyTabs: NavigatorScreenParams<MainTabsParamList>

  Login: undefined
  Message: undefined
  Map: undefined
  NotFound: undefined
} & IncidentTabsParamList &
  MyTabsParamList &
  OrderTabsParamList

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>

// 底部按钮路由
export type MainTabsParamList = {
  Home: undefined
  Incident: undefined
  Order: undefined
  Work: undefined
  My: undefined
}

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  ForwardedTabScreenProps<MainTabsParamList & RootStackParamList, T>

export type IncidentTabsScreenProps<T extends keyof IncidentTabsParamList> =
  ForwardedTabScreenProps<IncidentTabsParamList & RootStackParamList, T>

export type MyTabsScreenProps<T extends keyof MyTabsParamList> = ForwardedTabScreenProps<
  MyTabsParamList & RootStackParamList,
  T
>

export type OrderTabsScreenProps<T extends keyof OrderTabsParamList> =
  ForwardedTabScreenProps<OrderTabsParamList & RootStackParamList, T>

export type MyTabsParamList = MyTabsParamList
export type IncidentTabsParamList = IncidentTabsParamList
export type OrderTabsParamList = OrderTabsParamList
