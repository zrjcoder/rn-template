import React, { forwardRef } from 'react'
import { Center, HStack, Image, Text } from 'native-base'

import { Dialog, type DialogProps, type DialogHandle } from '@/components'

import { TButton } from '../Base/TButton'

export const Completed = forwardRef<DialogHandle, DialogProps>(({ ...props }, ref) => {
  return (
    <Dialog title="案件处置完成" {...props} ref={ref}>
      <Center mt={8}>
        <Image
          h={'60px'}
          w={'60px'}
          resizeMode="cover"
          source={require('@/assets/images/dialog-complete.png')}
          alt="image"
        />
      </Center>

      <Center mt={2}>
        <Text fontSize={'md'} fontWeight={'600'}>
          案件处置已完成
        </Text>
      </Center>

      <HStack justifyContent={'space-around'} m={6} alignItems={'center'} zIndex={999}>
        <TButton
          containerStyle={{
            w: '130px',
          }}
          onPress={() => {
            ;(ref as any)?.current?.closeDialog()
          }}
          textStyle={{ p: [1, 2] }}>
          关闭
        </TButton>
      </HStack>
    </Dialog>
  )
})
