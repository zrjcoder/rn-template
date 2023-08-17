import React, { useState, useEffect, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import { withForwardedNavigationParams } from 'react-navigation-props-mapper'
import { Box, Center, Text } from 'native-base'

import { MainTabsScreenProps } from '@/navigators/types'
import { History, Incident, Ongoing } from './Tabs'
import { SearchBar } from '@/components'

export const Home = withForwardedNavigationParams<MainTabsScreenProps<'Home'>>()(() => {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'incident', title: '警情列表' },
    { key: 'ongoing', title: '正在进行' },
    { key: 'history', title: '历史警情' },
  ])

  return (
    <Box flex="1" backgroundColor={'#ffffff'}>
      <Center>
        <Box w={'90%'} mt={4}>
          <SearchBar />
        </Box>
      </Center>

      <TabView
        // lazy
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          return SceneMapComponent(route.key as any)
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{
              backgroundColor: '#ffffff',
            }}
            renderLabel={({ route, focused }) => (
              <Text
                fontWeight={focused ? 'medium' : 'normal'}
                color={focused ? '#266EFF' : '#666666'}>
                {route.title}
              </Text>
            )}
            contentContainerStyle={{
              marginTop: -5,
              marginBottom: -4,
            }}
            indicatorStyle={{
              backgroundColor: '#266EFF',
              width: 40,
              height: 3,
              borderRadius: 5,
              left: (layout.width / 3 - 40) / 2,
            }}
          />
        )}
      />
    </Box>
  )

  function SceneMapComponent(name: 'incident' | 'ongoing' | 'history') {
    const components = {
      incident: Incident,
      ongoing: Ongoing,
      history: History,
    }

    const Component = components[name]

    if (Component) {
      return <Component tab={index} />
    }

    return null
  }
})
