import React, { forwardRef } from 'react'
import { Box, HStack, VStack, Text } from 'native-base'

import {
  Icons,
  Dialog,
  type DialogProps,
  type DialogHandle,
  FormTextArea,
} from '@/components'

import { TButton } from '@/components/home'

export type CancelProps = {
  onLeftPress?: () => void
} & DialogProps

export const Cancel = forwardRef<DialogHandle, CancelProps>(
  ({ onLeftPress, ...props }, ref) => {
    return (
      <Dialog title={'取消出警任务'} {...props} ref={ref}>
        <VStack mx={3} mt={6}>
          <HStack mb={2}>
            <Text color={'#FF2200'} mr={1}>
              *
            </Text>
            <Text>取消原因</Text>
          </HStack>

          <FormTextArea placeholder="请输入原因" />

          <HStack mt={2} mb={4} alignItems={'center'}>
            {Icons.error}
            <Text ml={1} color={'#FF2200'}>
              未填写取消意见，不能取消本次任务
            </Text>
          </HStack>
        </VStack>

        <HStack
          justifyContent={'space-around'}
          mx={4}
          mb={5}
          alignItems={'center'}
          zIndex={999}>
          <TButton
            flex={1}
            onPress={onLeftPress}
            textStyle={{
              px: 2,
              py: 1,
            }}>
            取消
          </TButton>

          <Box mx={3} />

          <TButton
            flex={1}
            theme="light"
            onPress={() => {
              ;(ref as any)?.current?.closeDialog()
            }}
            textStyle={{
              px: 2,
              py: 1,
            }}>
            取消
          </TButton>
        </HStack>
      </Dialog>
    )
  }
)
