import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from 'react'
import { Center, Box, HStack, Image } from 'native-base'

import { Dialog, type DialogProps, type DialogHandle } from '@/components'

export type ImmediateResHandle = {
  countDown: () => void
}

export const Immediate = forwardRef<ImmediateResHandle, DialogProps>(
  ({ ...props }, ref) => {
    const [count, setCount] = useState(3)
    const dialogRef = useRef<DialogHandle>(null)

    useEffect(() => {
      if (count >= 0) {
        const timer = setInterval(() => {
          setCount((prevCount) => prevCount - 1)
        }, 1000)
        return () => clearInterval(timer)
      } else {
        dialogRef.current?.closeDialog()
      }
    }, [count])

    useImperativeHandle(ref, () => ({
      countDown: () => {
        setCount(3)
        dialogRef.current?.showDialog()
      },
    }))

    return (
      <Dialog
        title="立即出警"
        {...props}
        ref={dialogRef}

        // onClose={() => {}}
      >
        <Center my={8}>
          <Image
            h={'120px'}
            w={'120px'}
            resizeMode="cover"
            source={require('@/assets/images/dialog-immediate.png')}
            alt="image"
          />
        </Center>

        <HStack justifyContent={'center'} mb={12}>
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

        <HStack bg={'red.100'} width={'100%'} justifyContent={'center'} mb={5}>
          <Box
            size={'35px'}
            background={'#87888890'}
            position={'absolute'}
            bottom={0}
            borderRadius={'full'}
            _text={{
              fontSize: 'xl',
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: '700',
              lineHeight: '35px',
            }}>
            {count}
          </Box>
        </HStack>
      </Dialog>
    )
  }
)
