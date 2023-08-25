import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList as List } from 'native-base'
import { IFlatListProps } from 'native-base/lib/typescript/components/basic/FlatList'

import { Loading } from '@/components'

export type FlatListParamsProps = {
  keyword?: string
  pageSize?: number
  pageNum?: number
}

export type FlatListProps = IFlatListProps<any> & {
  data: any[]
  isFetching?: boolean
  onRefresh?: () => void
}

export type FlatListHandle = {
  setRefreshing: (refreshing: boolean) => void
}

export const FlatList = forwardRef<FlatListHandle, FlatListProps>(
  ({ data, isFetching = false, onRefresh, ...props }, ref) => {
    const [refreshing, setRefreshing] = useState(isFetching)

    useEffect(() => {
      setRefreshing(isFetching)
    }, [isFetching])

    useImperativeHandle(ref, () => ({
      setRefreshing,
    }))

    return (
      <List
        data={data}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Loading />}
        {...props}
      />
    )
  }
)
