import React from 'react'
import { Divider, HStack, Image, Text, VStack } from 'native-base'
import { ImageSourcePropType, TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { type RootStackScreenProps, type MyTabsParamList } from '@/navigators/types'
import { Icons } from '@/components'

export type SettingProps = {
  title: string
  route: keyof MyTabsParamList & 'Logout'
  source: ImageSourcePropType | undefined
}

export function Settings({ settings }: { settings: SettingProps[] }) {
  const navigation = useNavigation<RootStackScreenProps<any>>()

  return (
    <VStack>
      {settings.map((setting, index) => (
        <TouchableNativeFeedback
          key={setting.route}
          onPress={() => {
            switch (setting.route) {
              case 'Logout':
                navigation.navigate('Login')
                break

              default:
                navigation.navigate(setting.route)
                break
            }
          }}>
          <VStack>
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
        </TouchableNativeFeedback>
      ))}
    </VStack>
  )
}
