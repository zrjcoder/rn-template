import React from 'react'
import { Box, VStack } from 'native-base'
import { TButton } from '@/components/home'

import { useNavigation } from '@react-navigation/native'

import { type MyTabsParamList, type RootStackScreenProps } from '@/navigators/types'

export function OrderItem() {
  const navigation = useNavigation<RootStackScreenProps<'OrderTabs'>>()

  return (
    <VStack>
      <TButton
        mb={4}
        onPress={() => {
          navigation.navigate('OrderTabs', {
            screen: 'TogetherFeedback',
          })
        }}>
        OrderItem
      </TButton>
      <TButton mb={4}>OrderItem</TButton>
      <TButton mb={4}>OrderItem</TButton>
      <TButton mb={4}>OrderItem</TButton>
    </VStack>
  )
}
