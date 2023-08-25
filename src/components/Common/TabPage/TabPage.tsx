import React, { useState, useEffect } from 'react'
import { useWindowDimensions, StyleProp, ViewStyle } from 'react-native'
import { Box, IBoxProps, Text } from 'native-base'

import {
  TabView as DefaultTabView,
  TabBar,
  type SceneRendererProps,
} from 'react-native-tab-view'

export type TabsProps = {
  height: number | undefined
  tabBarButton?: {
    text: string
    onPress: () => void
    source: any
  }
}[]

export type TabViewProps = {
  onLoad?: (props: { setTabs: (tabs: TabsProps) => void }) => void
  routeScene: {
    key: string
    title: string
  }[]
  pagerStyle?: StyleProp<ViewStyle>

  renderScene: (props: SceneRendererProps & { route: { key: string } }) => React.ReactNode
} & IBoxProps

export function TabPage({
  onLoad = () => {},
  routeScene,
  renderScene,
  pagerStyle = {},
  ...props
}: TabViewProps) {
  const [index, setIndex] = useState(0)
  const [tabs, setTabs] = useState<TabsProps>([])
  const [routes] = useState(routeScene)

  useEffect(() => {
    onLoad({ setTabs })
  }, [onLoad])

  return (
    <Box flex={1} bg="#ffffff" shadow={0} borderRadius={5} {...props}>
      <DefaultTabView
        style={{
          borderRadius: 5,
        }}
        onSwipeEnd={() => {
          onLoad({ setTabs })
        }}
        navigationState={{ index, routes } as any}
        onIndexChange={setIndex}
        renderTabBar={DefaultTabBar}
        renderScene={renderScene}
        pagerStyle={pagerStyle}
      />
    </Box>
  )
}

function DefaultTabBar(props) {
  const layout = useWindowDimensions()

  return (
    <TabBar
      scrollEnabled
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
      tabStyle={{
        width: layout.width / 4 - 10,
      }}
      indicatorStyle={{
        backgroundColor: '#266EFF',
        width: 40,
        height: 3,
        borderRadius: 5,
        left: (layout.width / 4 - 50) / 2,
      }}
    />
  )
}
