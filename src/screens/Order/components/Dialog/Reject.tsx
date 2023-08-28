import React, { forwardRef } from 'react'
import { Box, HStack, VStack, Text } from 'native-base'

import {
  Dialog,
  type DialogProps,
  type DialogHandle,
  FormTextArea,
  Icons,
} from '@/components'

import { TButton } from '@/components/home'

export type RejectProps = {
  onLeftPress?: () => void
} & DialogProps

export const Reject = forwardRef<DialogHandle, RejectProps>(
  ({ onLeftPress, ...props }, ref) => {
    return (
      <Dialog title={'驳回指令'} {...props} ref={ref}>
        <VStack mx={3} mt={6}>
          <HStack mb={2}>
            <Text color={'#FF2200'} mr={1}>
              *
            </Text>
            <Text>驳回意见</Text>
          </HStack>

          <FormTextArea />

          <HStack mt={2} mb={4} alignItems={'center'}>
            {Icons.error}
            <Text ml={1} color={'#FF2200'}>
              未填写驳回意见，不可驳回
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
            驳回
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
