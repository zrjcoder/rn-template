import React, { forwardRef } from 'react'
import { Center, HStack, Image } from 'native-base'

import { Dialog, type DialogProps, type DialogHandle } from '@/components'

import { TButton } from '@/components/home'

export type AlarmProps = {
  onLeftPress: () => void
  onRightPress: () => void
} & DialogProps

export const Alarm = forwardRef<DialogHandle, AlarmProps>(
  ({ onLeftPress, onRightPress, ...props }, ref) => {
    return (
      <Dialog title="已接收新警情" {...props} ref={ref}>
        <Center my={8}>
          <Image
            h={'120px'}
            w={'120px'}
            resizeMode="cover"
            source={require('@/assets/images/dialog-alarm.png')}
            alt="image"
          />
        </Center>

        <HStack
          justifyContent={'space-around'}
          mx={4}
          mb={5}
          alignItems={'center'}
          zIndex={999}>
          <TButton
            onPress={onLeftPress}
            textStyle={{
              px: 2,
              py: 1,
            }}>
            立即出警
          </TButton>

          <TButton
            onPress={onRightPress}
            textStyle={{
              px: 2,
              py: 1,
            }}>
            联系报警人
          </TButton>
        </HStack>
      </Dialog>
    )
  }
)
