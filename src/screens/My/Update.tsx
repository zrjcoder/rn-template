import React, { useState } from 'react'
import { Box, Text } from 'native-base'
import { useWindowDimensions } from 'react-native'

import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

import { TabPage } from '@/components'

const renderSceneMap = SceneMap({
  '1': Gua,
  '2': Gua,
  '3': Gua,
  '4': Gua,
  '5': Gua,
  '6': Gua,
  '7': Gua,
})

export function Update() {
  const routes = [
    { key: '1', title: '基本信息' },
    { key: '2', title: '涉案信息' },
    { key: '3', title: '关系人' },
    { key: '4', title: '财产信息' },
    { key: '5', title: '车辆信息' },
    { key: '6', title: '个人信息' },
    { key: '7', title: '环境信息' },
  ]

  return <TabPage routeScene={routes} renderScene={renderSceneMap} />
}

function Gua() {
  return <Box>dudu</Box>
}
