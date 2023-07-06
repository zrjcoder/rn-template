import React, { useState, useEffect, useRef } from 'react'
import { Box, Image, VStack } from 'native-base'

import { getItems } from './api'
import { FlatList, type FlatListHandle, InfoBox } from '@/components'
import { ExpandItem, EmbedTCard, ReportInfo } from '@/components/home'

export const Message = () => {
  const [dataSource, setDataSource] = useState([])

  const listRef = useRef<FlatListHandle>(null)

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
          <ExpandItem item={item}>
            <Content />
          </ExpandItem>
        )}
      />
    </Box>
  )
}

function Content() {
  return (
    <VStack>
      <EmbedTCard title="案件信息">
        <InfoBox
          data={{
            date: '2023.05.12',
            address: '集宁区火车站入口处',
            type: '人脸识别',
          }}
          info={{
            date: '预警时间',
            address: '预警地点',
            type: '预警方式',
          }}
        />

        <Image
          mt={4}
          w={'100%'}
          h={'160px'}
          resizeMode="cover"
          source={require('@/assets/images/modal-top.png')}
          alt="image"
        />
      </EmbedTCard>

      <EmbedTCard title="基本信息" mb={4}>
        <ReportInfo mt={3} />
      </EmbedTCard>
    </VStack>
  )
}
