import React from 'react'
import { Box, HStack, Image, VStack } from 'native-base'
import { Tag } from '@/components'

export function ImageContrast() {
  return (
    <HStack flex={1} height={'160px'} mx={3}>
      <Image
        bg={'red.100'}
        h={'160px'}
        w={'120px'}
        source={require('@/assets/images/dialog-alarm.png')}
        resizeMode="contain"
        alt="icon"
      />
      <VStack flex={1} alignItems={'center'} justifyContent={'center'}>
        <Box
          _text={{
            fontSize: 'xs',
            textAlign: 'center',
          }}>
          比对相似处
        </Box>
        <Tag text="98.99%" mb={6} />
      </VStack>
      <Image
        bg={'red.100'}
        h={'160px'}
        w={'120px'}
        source={require('@/assets/images/dialog-alarm.png')}
        resizeMode="contain"
        alt="icon"
      />
    </HStack>
  )
}
