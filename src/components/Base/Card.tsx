import React from 'react'
import { Box, VStack, IBoxProps } from 'native-base'

export type CardProps = {
  children: React.ReactNode
} & IBoxProps

export function Card(props: CardProps) {
  return (
    <Box w={'full'}>
      <VStack
        mx="3"
        mt="3"
        px="3"
        mb={'1px'}
        bg="#ffffff"
        shadow={0}
        borderRadius={5}
        {...props}>
        {props.children}
      </VStack>
    </Box>
  )
}
