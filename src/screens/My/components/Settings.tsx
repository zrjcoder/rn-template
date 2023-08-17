import React from 'react'
import { Divider, HStack, Image, Text, VStack } from 'native-base'
import { ImageSourcePropType } from 'react-native'

import { Icons } from '@/components'

export type SettingProps = {
  title: string
  id: number
  source: ImageSourcePropType | undefined
}

export function Settings({ settings }: { settings: SettingProps[] }) {
  return (
    <VStack>
      {settings.map((setting, index) => (
        <VStack key={setting.id}>
          <HStack alignItems={'center'} justifyContent={'space-between'} paddingY={3}>
            <HStack alignItems={'center'}>
              <Image
                source={setting.source}
                size="4"
                mr={2}
                resizeMode="contain"
                alt="icon"
              />
              <Text>{setting.title}</Text>
            </HStack>

            <HStack>{Icons.right}</HStack>
          </HStack>

          {index < settings.length - 1 && <Divider />}
        </VStack>
      ))}
    </VStack>
  )
}
