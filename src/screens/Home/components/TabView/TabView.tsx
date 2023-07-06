import React, { useState, useEffect } from 'react'
import { useWindowDimensions, StyleProp, ViewStyle } from 'react-native'
import { Box, IBoxProps } from 'native-base'
import { TabView as DefaultTabView, type SceneRendererProps } from 'react-native-tab-view'

import { TabBarHeader as DefaultTabBarHeader, TabBarButton } from './index'

export type TabsProps = {
  height: number | undefined
  tabBarButton?: {
    text: string
    onPress: () => void
    source: any
  }
}[]

export type TabViewProps = {
  onLoad: (props: { setTabs: (tabs: TabsProps) => void }) => void
  tabBarHeader?: React.FC
  routeScene: {
    key: string
    title: string
  }[]
  pagerStyle?: StyleProp<ViewStyle>

  renderScene: (props: SceneRendererProps & { route: { key: string } }) => React.ReactNode
} & IBoxProps

export function TabView({
  onLoad = () => {},
  tabBarHeader,
  routeScene,
  renderScene,
  pagerStyle = {},
  ...props
}: TabViewProps) {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [tabs, setTabs] = useState<TabsProps>([])
  const [routes] = useState(routeScene)

  useEffect(() => {
    onLoad({ setTabs })
  }, [onLoad])

  return (
    <Box
      h={`${44 + (tabs[index]?.height ?? 0)}px`}
      bg="#ffffff"
      shadow={0}
      borderRadius={5}
      {...props}>
      <DefaultTabView
        style={{
          borderRadius: 5,
        }}
        onSwipeEnd={() => {
          onLoad({ setTabs })
        }}
        renderTabBar={(p) => {
          const tarBarButton = tabs[index]?.tabBarButton ?? null

          return (
            <Box>
              {tabBarHeader || <DefaultTabBarHeader width={layout.width} {...p} />}

              {tarBarButton && <TabBarButton {...tarBarButton} />}
            </Box>
          )
        }}
        navigationState={{ index, routes } as any}
        onIndexChange={setIndex}
        renderScene={renderScene}
        pagerStyle={pagerStyle}
      />
    </Box>
  )
}
