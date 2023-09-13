import React, { useRef, useState } from 'react'
import { Box } from 'native-base'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { TabPage, Icons, type TabPageHandle } from '@/components'
import { type UserState } from '@/store/user'
import { MessageList } from './MessageList'
import { type RootStackScreenProps } from '@/navigators/types'
import { MessageTypeProps } from '@/store/user/value'
import { SceneMap } from 'react-native-tab-view'

export type MessageRouteProps = {
  key: MessageTypeProps['code']
  title: string
  type: MessageTypeProps['type']
}

export function Message() {
  const navigation = useNavigation<RootStackScreenProps<'Filter'>>()
  const tabPageRef = useRef<TabPageHandle>(null)

  let messageTypes = useSelector((state: { user: UserState }) => state.user.messageTypes)

  const [index, setIndex] = useState(0)
  const [routes, setRoutes] = useState(format(messageTypes))

  React.useEffect(() => {
    setRoutes(format(messageTypes))
  }, [messageTypes])

  return (
    <Box flex="1" backgroundColor={'#ffffff'}>
      <TabPage
        ref={tabPageRef}
        navigationState={{ index, routes } as any}
        onIndexChange={setIndex}
        renderScene={SceneMap({
          case: MessageList,
          compose: MessageList,
          read: MessageList,
          unread: MessageList,
          warn: MessageList,
          escapee: MessageList,
        })}
      />

      <Box
        position={'absolute'}
        top={0}
        right={0}
        h={10}
        px={2}
        justifyContent={'center'}
        onTouchStart={() => {
          navigation.navigate('Filter')
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
