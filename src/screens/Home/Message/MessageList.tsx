import React, { useEffect, useCallback } from 'react'
import { Box } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import {
  FlatList,
  type FlatListHandle,
  Toast,
  type FlatListParamsProps,
} from '@/components'
import { useLazyFetchMessageListQuery } from '@/services'
import { MessageItem } from '.'
import { convertIncidentDataToShow } from '@/util'

export type MessageListProps = {
  params?: FlatListParamsProps
  onLoad?: () => void
  status: string
}

export function MessageList({ params, onLoad, status }: MessageListProps) {
  const [fetchMessageList, { data, isFetching }] = useLazyFetchMessageListQuery()

  const getData = useCallback(
    (params = {}) => {
      let condition = {}
      switch (status) {
        case 'Unread':
          condition = { readStatus: '0' }
          break
        case 'Read':
          condition = { readStatus: '1' }
          break

        default:
          break
      }

      fetchMessageList({
        condition,
        ...params,
      })
    },
    [fetchMessageList, status]
  )

  useEffect(() => {
    getData(params)
  }, [getData, params])

  return (
    <Box flex={1} bg="#F5F7F9">
      <FlatList
        isFetching={isFetching}
        data={data?.data?.list ?? []}
        onRefresh={() => {
          // getData({})
        }}
        renderItem={({ item }) => (
          <MessageItem
            // item={convertIncidentDataToShow(item)}
            onPress={() => {
              // navigation.navigate('Map')
            }}
          />
        )}
      />
    </Box>
  )
}
