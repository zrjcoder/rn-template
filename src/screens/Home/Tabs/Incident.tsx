import React, { useState, useEffect, useRef } from 'react'
import { Box } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import { getItems } from '../api'
import { FlatList, type FlatListHandle } from '@/components'
import { IncidentItem } from '../components'
import { useFetchIncidentListQuery } from '@/services'

export const Incident = () => {
  const [dataSource, setDataSource] = useState([])

  const { data, isLoading, isError, isSuccess } = useFetchIncidentListQuery({
    condition: {
      receiveStatus: 0,
      feedBackStatus: 0,
    },
  })

  const listRef = useRef<FlatListHandle>(null)

  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()

  const getData = () => {
    getItems().then((res) => {
      setDataSource(res)
      listRef.current?.setRefreshing(false)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Box flex={1} bg="#F5F7F9">
      <FlatList
        ref={listRef}
        data={dataSource}
        renderItem={({ item }) => (
          <IncidentItem
            item={item}
            leftPress={() => {}}
            centerPress={() => {
              navigation.navigate('IncidentTabs', {
                screen: 'Scene',
              })
            }}
            rightPress={() => {
              navigation.navigate('Map')
            }}
          />
        )}
      />
    </Box>
  )
}
