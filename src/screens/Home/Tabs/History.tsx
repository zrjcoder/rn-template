import React, { useState, useEffect, useRef } from 'react'
import { Box } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import { getItems } from '../api'
import { FlatList, type FlatListHandle } from '@/components'
import { HistoryItem } from '../components'

export const History = () => {
  const [dataSource, setDataSource] = useState([])

  const listRef = useRef<FlatListHandle>(null)
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()

  const getData = () => {
    // getItems().then((res) => {
    //   setDataSource(res)
    //   listRef.current?.setRefreshing(false)
    // })
  }

  useEffect(() => {
    // getData()
  }, [])

  return (
    <Box flex={1} bg="#F5F7F9">
      <FlatList
        ref={listRef}
        data={dataSource}
        renderItem={({ item }) => (
          <HistoryItem
            item={item}
            onPress={() => {
              navigation.navigate('IncidentTabs', {
                screen: 'Detail',
              })
            }}
          />
        )}
      />
    </Box>
  )
}
