import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Box, HStack, VStack } from 'native-base'

import { Dialog, type DialogHandle } from '@/components'

import { type MessageItemProps } from './MessageItem'

export type MessageDetailHandle = {
  showDialog: (data: MessageItemProps['item']) => void
}

export const MessageDetail = forwardRef<MessageDetailHandle>((_, ref) => {
  const [data, setData] = useState<MessageItemProps['item']>()
  const dialogRef = React.useRef<DialogHandle>(null)

  console.log('data: ', data)

  useImperativeHandle(ref, () => ({
    showDialog: (currentItem) => {
      setData(currentItem)
      dialogRef.current?.showDialog()
    },
  }))

  return (
    <Dialog ref={dialogRef} title={'消息详情'}>
      <VStack mx={3} mt={4}>
        <Box
          mb={2}
          _text={{
            textAlign: 'center',
            fontSize: 'md',
            bold: true,
          }}>
          {data?.msgTitle}
        </Box>

        <HStack justifyContent={'space-between'} mb={3}>
          <Box
            _text={{
              color: '#999999',
            }}>
            信息来源：技侦部门
          </Box>
          <Box
            _text={{
              color: '#999999',
            }}>
            {data?.createTime}
          </Box>
        </HStack>

        <Box
          mb={16}
          _text={{
            color: 'black',
          }}>
          {data?.msgContent}
        </Box>
      </VStack>
    </Dialog>
  )
})
