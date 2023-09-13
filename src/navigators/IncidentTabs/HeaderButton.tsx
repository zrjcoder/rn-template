import React from 'react'
import { Box, Image } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import { Button } from '@/components'

export function HeaderButton() {
  const navigation = useNavigation<RootStackScreenProps<'IncidentTabs'>>()

  return (
    <Button
      mb={1}
      isPressedStyle={false}
      isScale
      onPress={() => {
        navigation.navigate('Message')
      }}>
      <Image
        size={'22px'}
        resizeMode="cover"
        source={require('@/assets/icons/message.png')}
        alt="image"
      />
      <Box
        position={'absolute'}
        top={-2}
        bg={'#FF2200'}
        borderRadius={15}
        h={'12px'}
        w={'18px'}
        right={-5}
        _text={{
          color: '#ffffff',
          fontSize: '8px',
          textAlign: 'center',
        }}>
        10
      </Box>
    </Button>
  )
}
