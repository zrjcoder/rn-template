import React from 'react'
import { VStack, Input, Icon } from 'native-base'

export function SearchBar() {
  return (
    <VStack w="100%">
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          backgroundColor={'#F7F8FA'}
          placeholder="请输入关键词"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          InputLeftElement={<Icon ml="2" size="4" color="gray.400" />}
        />
      </VStack>
    </VStack>
  )
}
