import React, { forwardRef, useImperativeHandle } from 'react'
import { Box, HStack, VStack, Text } from 'native-base'

import {
  Icons,
  Dialog,
  Toast,
  type DialogProps,
  type DialogHandle,
  FormTextArea,
} from '@/components'

import { TButton } from '@/components/home'

export type CancelProps = {
  isLoading?: boolean
  onLeftPress?: () => void
} & DialogProps

export type CancelDialogHandle = {
  value: string
  showDialog: () => void
  closeDialog: () => void
}

export const Cancel = forwardRef<CancelDialogHandle, CancelProps>(
  ({ isLoading, onLeftPress, ...props }, ref) => {
    const [value, setValue] = React.useState('')
    const dialogRef = React.useRef<DialogHandle>(null)

    useImperativeHandle(ref, () => ({
      value,
      showDialog: () => {
        dialogRef.current?.showDialog()
      },
      closeDialog: () => {
        dialogRef.current?.closeDialog()
      },
    }))

    return (
      <Dialog title={'取消出警任务'} {...props} ref={dialogRef}>
        <VStack mx={3} mt={6}>
          <HStack mb={2}>
            <Text color={'#FF2200'} mr={1}>
              *
            </Text>
            <Text>取消原因</Text>
          </HStack>

          <FormTextArea
            placeholder="请输入原因"
            onChangeText={(text) => {
              setValue(text)
            }}
          />

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
            isLoading={isLoading}
            isLoadingText="取消中..."
            flex={1}
            onPress={() => {
              if (!value) {
                Toast.warning('请填写取消原因')
                return
              }

              onLeftPress?.()
            }}
            textStyle={{
              px: 2,
              py: 1,
            }}>
            确认
          </TButton>

          <Box mx={3} />

          <TButton
            flex={1}
            theme="light"
            onPress={() => {
              dialogRef.current?.closeDialog()
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
