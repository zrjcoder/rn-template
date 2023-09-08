import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Center, HStack, Image, Box } from 'native-base'

import { Dialog, type DialogProps, type DialogHandle } from '@/components'

import { TButton } from '@/components/home'

export type AlarmProps = {
  title?: string
  isLoading?: boolean
  onLeftPress?: (item: any) => void
  onRightPress?: (item: any) => void
} & DialogProps

export const Alarm = forwardRef<any, AlarmProps>(
  (
    { isLoading, title = '标题', onLeftPress = () => {}, onRightPress, ...props },
    ref
  ) => {
    const [data, setData] = useState(null)
    const dialogRef = useRef<DialogHandle>(null)

    useImperativeHandle(ref, () => ({
      showDialog: (item: any) => {
        dialogRef.current?.showDialog()
        setData(item)
      },
      closeDialog: () => {
        dialogRef.current?.closeDialog()
      },
    }))

    return (
      <Dialog title={title} {...props} ref={dialogRef}>
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
            isLoading={isLoading}
            isLoadingText="出警中..."
            flex={1}
            onPress={() => {
              onLeftPress(data)
            }}
            textStyle={{
              px: 2,
              py: 1,
            }}>
            立即出警
          </TButton>

          <Box mx={3} />

          <TButton
            flex={1}
            onPress={() => {
              onRightPress(data)
            }}
            theme="light"
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
