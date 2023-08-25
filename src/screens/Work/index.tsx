import React, { useState } from 'react'
import { Box, HStack, Text } from 'native-base'
import { useWindowDimensions } from 'react-native'

import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

import { SearchBar, TabPage } from '@/components'

const renderSceneMap = SceneMap({
  '1': Gua,
  '2': Gua,
  '3': Gua,
})

export function Work() {
  const routes = [
    { key: '1', title: '未处置' },
    { key: '2', title: '进行中' },
    { key: '3', title: '已完成' },
  ]

  return (
    <HStack>
      <SearchBar />
      <TabPage routeScene={routes} renderScene={renderSceneMap} />
    </HStack>
  )
}

function Gua() {
  return <Box>dudu</Box>
}
