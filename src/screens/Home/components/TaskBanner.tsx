/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Box, VStack } from 'native-base'
import { TabView } from 'react-native-tab-view'

import { TabTitle } from './TabTitle'
import { BannerItem } from './BannerItem'

export function TaskBanner({
  taskList,
  orderList,
}: {
  taskList: any[]
  orderList: any[]
}) {
  const [tabIndex, setTabIndex] = useState(0)

  const [routes, setRoutes] = useState(getCurrentTabData())
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setRoutes(getCurrentTabData())
  }, [taskList, orderList, tabIndex])

  return (
    <VStack mt={4}>
      <TabTitle
        mx={3}
        tabs={tabTitles}
        tabIndex={tabIndex}
        onPress={(key) => {
          setTabIndex(key)
        }}
      />

      <VStack minH={'150px'}>
        <TabView
          lazy
          style={{
            borderRadius: 5,
          }}
          onIndexChange={setIndex}
          renderTabBar={() => <Box />}
          tabBarPosition="bottom"
          renderScene={({ route }: { route: any }) => {
            return <BannerItem item={route?.item} />
          }}
          navigationState={{ index, routes } as any}
        />
      </VStack>
    </VStack>
  )

  function getCurrentTabData() {
    return tabIndex === 0
      ? taskList?.map((item, index) => ({ key: index, item, title: '' }))
      : orderList?.map((item, index) => ({ key: index, item, title: '' }))
  }
}

const tabTitles = [
  {
    title: '警情任务',
    key: 0,
  },
  {
    title: '重点人指令',
    key: 1,
  },
]
