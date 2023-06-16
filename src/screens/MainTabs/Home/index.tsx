import React from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { withForwardedNavigationParams } from 'react-navigation-props-mapper'
import { Box } from 'native-base'

import { MainTabsScreenProps } from '../../../navigators/types'

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

export const Home = withForwardedNavigationParams<
  MainTabsScreenProps<'Home'>
>()(() => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
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

function FirstRoute() {
  return <Box bg="primary.400">1</Box>
}
function SecondRoute() {
  return <Box bg="warning.500">2</Box>
}
