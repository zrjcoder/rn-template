import React from 'react'
import { HStack, Image, Text, VStack } from 'native-base'
import { ImageSourcePropType, TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { type MyTabsParamList, type RootStackScreenProps } from '@/navigators/types'

export type ToolProps = {
  title: string
  route: keyof MyTabsParamList
  source: ImageSourcePropType | undefined
}

export function Tools({ tools }: { tools: ToolProps[] }) {
  const navigation = useNavigation<RootStackScreenProps<any>>()

  return (
    <HStack>
      {tools.map((tool) => (
        <TouchableNativeFeedback
          key={tool.route}
          onPress={() => {
            navigation.navigate(tool.route as any)
          }}>
          <VStack alignItems={'center'} mr={6}>
            <Image
              source={tool.source}
              size="8"
              resizeMode="contain"
              alt="icon"
              marginY={2}
            />
            <Text>{tool.title}</Text>
          </VStack>
        </TouchableNativeFeedback>
      ))}
    </HStack>
  )
}
