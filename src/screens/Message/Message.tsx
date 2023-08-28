import React, { useState, useRef } from 'react'
import { Box } from 'native-base'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import {
  TabPage,
  type FlatListParamsProps,
  Icons,
  type TabPageHandle,
} from '@/components'
import { type UserState } from '@/store/user'
import { MessageList } from './MessageList'
import { type RootStackScreenProps } from '@/navigators/types'
import { MessageTypeProps } from '@/store/user/value'

export type MessageRouteProps = {
  key: MessageTypeProps['code']
  title: string
  type: MessageTypeProps['type']
}

export function Message() {
  const navigation = useNavigation<RootStackScreenProps<'MyTabs'>>()
  const tabPageRef = useRef<TabPageHandle>(null)

  let messageTypes = useSelector((state: { user: UserState }) => state.user.messageTypes)

  const routes = format(messageTypes)

  const [params, setParams] = useState<FlatListParamsProps>({
    keyword: '',
    pageSize: 20,
    pageNum: 1,
  })

  return (
    <Box flex="1" backgroundColor={'#ffffff'}>
      <TabPage
        ref={tabPageRef}
        routeScene={routes as any}
        renderScene={({ route }) => {
          return <MessageList params={params} route={route as MessageRouteProps} />
        }}
      />

      <Box
        position={'absolute'}
        top={0}
        right={0}
        h={10}
        px={2}
        justifyContent={'center'}
        onTouchStart={() => {
          navigation.navigate('MyTabs', {
            screen: 'Filter',
            params: {
              callback: () => {
                console.log('messageTypes: ', messageTypes)
                tabPageRef.current?.setMessageRoutes(format(messageTypes))
              },
            },
          })
        }}>
        {Icons.filterLight}
      </Box>
    </Box>
  )
}

function format(routes: MessageTypeProps[]) {
  // const [routes, setRoutes] = useState([
  //   {
  //     key: 'All',
  //     title: '全部',
  //     type: 'title',
  //   },
  // ])
  return routes
    .filter((item) => item.type === 'item' && item.isShow)
    .map((item) => ({
      key: item.code,
      title: item.value,
      type: item.type,
    }))
}
