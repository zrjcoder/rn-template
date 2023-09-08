import React, { useEffect, useCallback } from 'react'
import { Box } from 'native-base'

import { RootStackScreenProps } from '@/navigators/types'
import {
  FlatList,
  type FlatListHandle,
  Toast,
  type FlatListParamsProps,
} from '@/components'
import { useLazyFetchTaskListQuery } from '@/services'
import { OrderItem } from '.'

export type OrderListProps = {
  params?: FlatListParamsProps
  onLoad?: () => void
  status: string
}

export function OrderList({ params, onLoad, status }: OrderListProps) {
  const [fetchOrderList, { data, isFetching }] = useLazyFetchTaskListQuery()

  const getData = useCallback(
    (params = {}) => {
      let condition = {}
      switch (status) {
        case 'todo':
          condition = { selType: 'todo' }
          break
        case 'doing':
          condition = { selType: 'doing' }
          break
        case 'done':
          condition = { selType: 'done' }
          break
      }

      fetchOrderList({
        condition: {
          ...condition,
          type: 'other',
        },
        ...params,
      })
    },
    [fetchOrderList, status]
  )

  useEffect(() => {
    getData(params)
  }, [getData, params])

  return (
    <Box flex={1} bg="#F5F7F9">
      <FlatList
        isFetching={isFetching}
        // data={data?.data?.list ?? []}
        data={data?.data?.list ?? [1]}
        onRefresh={() => {
          getData(params)
        }}
        renderItem={({ item }) => <OrderItem item={item} />}
      />
    </Box>
  )
}
