import React, { useState } from 'react'
import { Box, Center } from 'native-base'
import { useSelector } from 'react-redux'

import { TabPage, SearchBar, type FlatListParamsProps } from '@/components'
import { type UserState } from '@/store/user'
import { MessageList } from './Message/MessageList'

export function Message() {
  const messageTypes = useSelector(
    (state: { user: UserState }) => state.user.messageTypes
  )

  const routes = messageTypes
    .filter((item) => item.type === 'item')
    .map((item) => ({
      key: item.code,
      title: item.value,
      type: item.type,
    }))
  routes.unshift({
    key: 'All',
    title: '全部',
  })

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
          console.log(route)
          return <MessageList params={params} status={route.key} />
        }}
      />
    </Box>
  )
}
