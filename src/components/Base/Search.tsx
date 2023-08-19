import React from 'react'
import { VStack, Input, Box, IInputProps } from 'native-base'
import { Icons } from '@/components'

export function SearchBar(props: IInputProps) {
  return (
    <VStack w="100%">
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          InputLeftElement={<Box ml={4}>{Icons.search}</Box>}
          backgroundColor={'#F7F8FA'}
          placeholder="请输入关键词"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          {...props}
          // InputRightElement={
          //   <HStack mr={2}>
          //     <Link
          //       onPress={() => {
          //         // TODO
          //       }}
          //       isUnderlined={false}
          //       _text={{ color: '#266EFF' }}>
          //       搜索
          //     </Link>
          //   </HStack>
          // }
        />
      </VStack>
    </VStack>
  )
}
