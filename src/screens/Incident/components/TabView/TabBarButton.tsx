import React from 'react'
import { HStack, Text, Image } from 'native-base'
import { Button } from '@/components'

export function TabBarButton({
  text,
  source,
  onPress,
}: {
  text: string
  source: any
  onPress: () => void
}) {
  return (
    <Button
      onPress={onPress}
      position={'absolute'}
      height={'100%'}
      right={2}
      justifyContent={'center'}
      top={0}>
      <HStack alignItems={'center'}>
        <Image
          size={4}
          resizeMode="cover"
          source={source ?? require('@/assets/icons/scan.png')}
          alt="image"
        />
        <Text color="#266EFF" pb={1 / 3}>
          {text ?? '点我'}
        </Text>
      </HStack>
    </Button>
  )
}
