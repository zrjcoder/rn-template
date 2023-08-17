import React from 'react'
import { HStack, Image, Text, VStack } from 'native-base'
import { ImageSourcePropType } from 'react-native'

export type ToolProps = {
  title: string
  id: number
  source: ImageSourcePropType | undefined
}

export function Tools({ tools }: { tools: ToolProps[] }) {
  return (
    <HStack>
      {tools.map((tool) => (
        <VStack key={tool.id} alignItems={'center'} mr={6}>
          <Image
            source={tool.source}
            size="8"
            resizeMode="contain"
            alt="icon"
            marginY={2}
          />
          <Text>{tool.title}</Text>
        </VStack>
      ))}
    </HStack>
  )
}
