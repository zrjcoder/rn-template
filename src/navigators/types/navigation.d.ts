import type { NavigatorScreenParams } from '@react-navigation/native'
import type { ForwardedTabScreenProps } from 'react-navigation-props-mapper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>
  IncidentTabs: NavigatorScreenParams<IncidentTabsParamList>
  MyTabs: NavigatorScreenParams<MyTabsParamList>
  Login: undefined
  Map: undefined
  NotFound: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>

// 底部按钮路由
export type MainTabsParamList = {
  Home: undefined
  Order: undefined
  Work: undefined
  My: undefined
}

// 警情模块下页面路由
export type IncidentTabsParamList = {
  Scene: { data: any }
  Case: undefined
  Detail: undefined
  Message: undefined
}

// 我的模块下页面路由
export type MyTabsParamList = {
  Profile: undefined
  Password: undefined
  Update: undefined
  Car: undefined
  Idcard: undefined
  Feedback: undefined
  Contact: undefined
  Filter: undefined
}

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  ForwardedTabScreenProps<MainTabsParamList & RootStackParamList, T>

export type IncidentTabsScreenProps<T extends keyof IncidentTabsParamList> =
  ForwardedTabScreenProps<IncidentTabsParamList & RootStackParamList, T>

export type MyTabsScreenProps<T extends keyof MyTabsParamList> = ForwardedTabScreenProps<
  MyTabsParamList & RootStackParamList,
  T
>
