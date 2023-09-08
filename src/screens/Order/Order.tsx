import React, { useState } from 'react'
import { Box, Center } from 'native-base'

import { TabPage, SearchBar, type FlatListParamsProps } from '@/components'
import { OrderList } from './components'

export function Order() {
  const routes = [
    { key: 'todo', title: '未处置' },
    { key: 'doing', title: '进行中' },
    { key: 'done', title: '已完成' },
  ]

  const [keyword, setKeyword] = useState('')
  const [params, setParams] = useState<FlatListParamsProps>({
    keyword: '',
    pageSize: 10,
    pageNum: 1,
  })

  return (
    <Box flex="1" backgroundColor={'#ffffff'}>
      <Center>
        <Box w={'90%'} mt={4}>
          <SearchBar
            onChangeText={setKeyword}
            onEndEditing={() => {
              setParams({ keyword })
            }}
          />
        </Box>
      </Center>

      <TabPage
        routeScene={routes}
        renderScene={({ route }) => {
          return <OrderList params={params} status={route.key} />
        }}
      />
    </Box>
  )
}
