import React from 'react'
import { Box } from 'native-base'
import { useFetchMessageListQuery } from '@/services'

export function Car() {
  const { data } = useFetchMessageListQuery({
    condition: { readStatus: '0' },
  })
  console.log(data)
  return <Box>车辆查询</Box>
}
