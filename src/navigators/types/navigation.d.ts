import type { NavigatorScreenParams } from '@react-navigation/native'
import type { ForwardedTabScreenProps } from 'react-navigation-props-mapper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>
  IncidentTabs: NavigatorScreenParams<IncidentTabsParamList>
  MyTabs: NavigatorScreenParams<MyTabsParamList>
  OrderTabs: NavigatorScreenParams<OrderTabsParamList>
  Login: undefined
  Message: undefined
  Map: undefined
  NotFound: undefined
}

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

// 警情模块下页面路由
export type IncidentTabsParamList = {
  Scene: { data: any }
  Case: undefined
  Detail: undefined
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
  Filter: { callback: () => void }
}

// 指令下页面路由
export type OrderTabsParamList = {
  // 合作作战
  TogetherAgainFeedback: undefined
  TogetherRead: undefined
  TogetherReceive: undefined
  TogetherFeedback: undefined
  // 重点人员
  PersonnelFeedback: undefined
  PersonnelReceive: undefined
  // 逃跑人员
  RunFeedback: undefined
  RunReceive: undefined
  // 智能预警
  WarningFeedback: undefined
  WarningReceive: undefined
}

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  ForwardedTabScreenProps<MainTabsParamList & RootStackParamList, T>

export type IncidentTabsScreenProps<T extends keyof IncidentTabsParamList> =
  ForwardedTabScreenProps<IncidentTabsParamList & RootStackParamList, T>

export type OrderTabsScreenProps<T extends keyof OrderTabsParamList> =
  ForwardedTabScreenProps<OrderTabsScreenProps & RootStackParamList, T>

export type MyTabsScreenProps<T extends keyof MyTabsParamList> = ForwardedTabScreenProps<
  MyTabsParamList & RootStackParamList,
  T
>
