import React, { useState, useEffect } from 'react'

import { RefreshControl } from 'react-native'
import { Box, FlatList } from 'native-base'

import { getItems } from '../api'
import { IncidentItem } from '@/components/home'

export const Ongoing = () => {
  const [refreshing, setRefreshing] = useState(true)
  const [dataSource, setDataSource] = useState([])

  const getData = () => {
    getItems().then((res) => {
      setDataSource(res)
      setRefreshing(false)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const onRefresh = () => {
    getData()
  }

  return (
    <Box flex={1} bg="#F5F7F9">
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <IncidentItem item={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Box>
  )
}
