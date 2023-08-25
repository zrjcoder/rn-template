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
import { useLazyFetchOrderListQuery } from '@/services'
import { OrderItem } from '.'

export type OrderListProps = {
  params?: FlatListParamsProps
  onLoad?: () => void
  status: string
}

export function OrderList({ params, onLoad, status }: OrderListProps) {
  const [fetchOrderList, { data, isFetching }] = useLazyFetchOrderListQuery()

  const getData = useCallback(
    (params = {}) => {
      let condition = {}
      switch (status) {
        case 'todo':
          condition = { type: '0' }
          break
        case 'going':
          condition = { type: '1' }
          break
        case 'done':
          condition = { type: '1' }
          break
      }

      fetchOrderList({
        condition,
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
          // getData({})
        }}
        renderItem={({ item }) => (
          <OrderItem
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
