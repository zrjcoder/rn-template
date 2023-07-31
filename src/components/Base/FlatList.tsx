import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList as List } from 'native-base'
import { IFlatListProps } from 'native-base/lib/typescript/components/basic/FlatList'

import { Loading } from '@/components'

export type FlatListProps = IFlatListProps<any> & {
  data: any[]
  onRefresh?: () => void
}

export type FlatListHandle = {
  setRefreshing: (refreshing: boolean) => void
}

export const FlatList = forwardRef<FlatListHandle, FlatListProps>(
  ({ data, onRefresh, ...props }, ref) => {
    const [refreshing, setRefreshing] = useState(true)

    useImperativeHandle(ref, () => ({
      setRefreshing,
    }))

    return (
      <List
        data={data}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Loading />}
        {...props}
      />
    )
  }
)
