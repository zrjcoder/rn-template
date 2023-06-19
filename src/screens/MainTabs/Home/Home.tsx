import React from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { withForwardedNavigationParams } from 'react-navigation-props-mapper'
import { Box } from 'native-base'

import { MainTabsScreenProps } from '@/navigators/types'
import { History, List, Ongoing } from './Tabs'

const renderScene = SceneMap({
  list: List,
  ongoing: Ongoing,
  history: History,
})

export const Home = withForwardedNavigationParams<
  MainTabsScreenProps<'Home'>
>()(() => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'list', title: '警情列表' },
    { key: 'ongoing', title: '正在进行' },
    { key: 'history', title: '历史警情' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
})
