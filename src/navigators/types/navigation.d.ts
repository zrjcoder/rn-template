import type { NavigatorScreenParams } from '@react-navigation/native'
import type { ForwardedTabScreenProps } from 'react-navigation-props-mapper'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>
  IncidentTabs: NavigatorScreenParams<IncidentTabsParamList>
  Login: undefined
  Map: undefined
  NotFound: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>

export type MainTabsParamList = {
  Home: undefined
  Order: undefined
  Work: undefined
  My: undefined
}

export type IncidentTabsParamList = {
  Scene: { data: any }
  Case: undefined
  Detail: undefined
  Message: undefined
}

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  ForwardedTabScreenProps<MainTabsParamList & RootStackParamList, T>

export type IncidentTabsScreenProps<T extends keyof IncidentTabsParamList> =
  ForwardedTabScreenProps<IncidentTabsParamList & RootStackParamList, T>
