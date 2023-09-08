import React, { useEffect, useCallback, useRef } from 'react'
import { Box } from 'native-base'

import { FlatList, type FlatListParamsProps } from '@/components'
import { useLazyFetchMessageListQuery } from '@/services'
import { MessageItem } from './MessageItem'
import { MessageRouteProps } from './Message'
import { MessageDetail, MessageDetailHandle } from './MessageDetail'

export type MessageListProps = {
  params?: FlatListParamsProps
  onLoad?: () => void
  route: MessageRouteProps
}

export function MessageList({ params, route }: MessageListProps) {
  const [fetchMessageList, { data, isFetching }] = useLazyFetchMessageListQuery()

  const detailRef = useRef<MessageDetailHandle>(null)

  const getData = useCallback(
    (params = {}) => {
      let condition = {}
      switch (route.key) {
        case 'unread':
          condition = { readStatus: 0 }
          break
        case 'read':
          condition = { readStatus: 1 }
          break

        default:
          condition = { msgType: route.key }
          break
      }

      fetchMessageList({
        condition,
        ...params,
      })
    },
    [fetchMessageList, route.key]
  )

  useEffect(() => {
    getData(params)
  }, [getData, params])

  return (
    <Box flex={1} bg="#F5F7F9">
      <MessageDetail ref={detailRef} />
      <FlatList
        isFetching={isFetching}
        data={data?.data?.list ?? []}
        onRefresh={() => {
          getData(params)
        }}
        renderItem={({ item }) => (
          <MessageItem
            item={item}
            onPress={() => {
              getData(params)
            }}
          />
        )}
      />
    </Box>
  )
}
