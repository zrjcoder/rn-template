import type { NavigatorScreenParams } from '@react-navigation/native'
import type {
  ForwardedNativeStackScreenProps,
  ForwardedTabScreenProps,
} from 'react-navigation-props-mapper'

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>
  Login: undefined
  Map: undefined
  NotFound: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  ForwardedNativeStackScreenProps<RootStackParamList, T>

export type MainTabsParamList = {
  Home: { name: string; id: number }
  My: undefined
  Page1: undefined
  Page2: undefined
}

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  ForwardedTabScreenProps<MainTabsParamList & RootStackParamList, T>
