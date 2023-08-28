import React, { forwardRef } from 'react'
import { Center, HStack, Text } from 'native-base'

import { Dialog } from '@/components'

import { TButton } from '../Base/TButton'

export const Canceled = forwardRef<any, any>(({ ...props }, ref) => {
  return (
    <Dialog title="已取消出警任务" {...props} ref={ref}>
      <Center mt={8}>
        <Text fontSize={'sm'}>您已取消本次出警任务</Text>
      </Center>

      <Center>
        <Text fontSize={'sm'}>案件处置已完成</Text>
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
