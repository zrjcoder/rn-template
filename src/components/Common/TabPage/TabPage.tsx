import React, { useState, useEffect } from 'react'
import { useWindowDimensions, StyleProp, ViewStyle } from 'react-native'
import { Box, IBoxProps, Text } from 'native-base'

import {
  TabView as DefaultTabView,
  TabBar,
  type SceneRendererProps,
  type TabViewProps as DefaultTabViewProps,
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
  styles?: IBoxProps
  pagerStyle?: StyleProp<ViewStyle>

  renderScene: (props: SceneRendererProps & { route: { key: string } }) => React.ReactNode
} & Partial<DefaultTabViewProps<any>>

export type TabPageHandle = {
  // setTabs: (tabs: TabsProps) => void
  tabs: TabsProps
  setMessageRoutes: (route: any) => void
}

export const TabPage = React.forwardRef<TabPageHandle, TabViewProps>(
  (
    {
      onLoad = () => {},
      routeScene,
      renderScene,
      pagerStyle = {},
      styles = {},
      ...props
    },
    ref
  ) => {
    const [index, setIndex] = useState(0)
    const [tabs, setTabs] = useState<TabsProps>([])
    const [routes, setRoutes] = useState(routeScene)

    useEffect(() => {
      onLoad({ setTabs })
    }, [onLoad])

    React.useImperativeHandle(ref, () => ({
      tabs: tabs,
      setMessageRoutes: (route: any) => {
        setRoutes(route)
      },
    }))

    return (
      <Box flex={1} bg="#ffffff" shadow={0} borderRadius={5} {...styles}>
        <DefaultTabView
          lazy
          style={{
            borderRadius: 5,
          }}
          onSwipeEnd={() => {
            onLoad({ setTabs })
          }}
          renderTabBar={DefaultTabBar}
          renderScene={renderScene}
          pagerStyle={pagerStyle}
          {...props}
          onIndexChange={setIndex}
          navigationState={{ index, routes } as any}
        />
      </Box>
    )
  }
)

function DefaultTabBar(props: any) {
  const layout = useWindowDimensions()

  return (
    <TabBar
      scrollEnabled
      {...props}
      style={{
        backgroundColor: '#ffffff',
        paddingRight: 20,
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
