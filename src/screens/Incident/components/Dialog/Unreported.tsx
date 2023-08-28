import React, { forwardRef } from 'react'
import { Center, Box, HStack, Image } from 'native-base'

import { Dialog, type DialogProps, type DialogHandle } from '@/components'

import { TButton } from '../Base/TButton'

export const Unreported = forwardRef<DialogHandle, DialogProps>(({ ...props }, ref) => {
  return (
    <Dialog title="未报备" {...props} ref={ref}>
      <Center my={8}>
        <HStack justifyContent={'center'} mb={5}>
          <Image
            h={'20px'}
            w={'20px'}
            mr={2}
            resizeMode="cover"
            source={require('@/assets/icons/warning.png')}
            alt="image"
          />
          <Box>请检查出警装备，并打开执法记录仪</Box>
        </HStack>
      </Center>

      <HStack
        justifyContent={'space-around'}
        mx={4}
        mb={5}
        alignItems={'center'}
        zIndex={999}>
        <TButton
          containerStyle={{
            w: '130px',
          }}
          onPress={() => {}}
          textStyle={{ p: [1, 2] }}>
          确认
        </TButton>

        <TButton
          containerStyle={{
            w: '130px',
          }}
          theme="light"
          onPress={() => {}}
          textStyle={{
            px: 2,
            py: 1,
          }}>
          取消
        </TButton>
      </HStack>
    </Dialog>
  )
})
