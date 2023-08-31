import React, { useEffect, useRef, useCallback } from 'react'
import { Box } from 'native-base'

import { FlatList, FlatListParamsProps, type FlatListHandle } from '@/components'
import { HistoryItem } from '../components'
import { useLazyFetchTaskListQuery } from '@/services'

export const History = ({ params }: { params: FlatListParamsProps }) => {
  const listRef = useRef<FlatListHandle>(null)

  const [fetchTaskList, { data }] = useLazyFetchTaskListQuery()

  const getData = useCallback(
    (params: FlatListParamsProps = {}) => {
      fetchTaskList({
        condition: { selType: 'done' },
        ...params,
      })
    },
    [fetchTaskList]
  )

  useEffect(() => {
    getData(params)
  }, [getData, params])

  return (
    <Box flex={1} bg="#F5F7F9">
      <FlatList
        ref={listRef}
        data={data?.data?.list ?? []}
        onRefresh={() => {
          getData(params)
        }}
        renderItem={({ item }) => <HistoryItem item={item} />}
      />
    </Box>
  )
}
