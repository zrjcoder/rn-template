import React from 'react'
import { Box, HStack, VStack } from 'native-base'
import { Icons } from '@/components'
import { TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackScreenProps } from '@/navigators/types'

export function ContactItem({ item }: { item: any }) {
  const navigation = useNavigation<RootStackScreenProps<'ContactDetail'>>()

  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        p={3}
        w={'100%'}
        bg={'#FFFFFF'}>
        <HStack>
          {Icons.head}

          <VStack ml={3}>
            <Box>{item?.nickName}</Box>
            <Box
              _text={{
                fontSize: 'xs',
                color: '#999999',
              }}>
              主任
            </Box>
          </VStack>
        </HStack>

        <HStack alignItems={'center'} mr={3}>
          <Box mr={3}>{item?.tel}</Box>

          {Icons.phone}
        </HStack>
      </HStack>
    </TouchableNativeFeedback>
  )

  function handlePress() {
    navigation.navigate('ContactDetail', {
      data: item,
    })
  }
}
