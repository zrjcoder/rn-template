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
  Home: { name: string; id: number }
  My: undefined
}

export type IncidentTabsParamList = {
  Scene: undefined
  Case: undefined
  Detail: undefined
  Message: undefined
}

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  ForwardedTabScreenProps<MainTabsParamList & RootStackParamList, T>

export type IncidentTabsScreenProps<T extends keyof MainTabsParamList> =
  ForwardedTabScreenProps<IncidentTabsParamList & RootStackParamList, T>
