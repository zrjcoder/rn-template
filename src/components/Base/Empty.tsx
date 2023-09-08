import React from 'react'
import { Box, Image } from 'native-base'

export function Empty() {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Image
        style={{
          marginTop: 120,
          height: 200,
          width: 200,
        }}
        alt="image"
        resizeMode="contain"
        source={require('@/assets/images/empty.png')}
      />
      <Box position={'absolute'} bottom={0}>
        暂无任务列表
      </Box>
    </Box>
  )
}
