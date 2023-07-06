import React from 'react'
import { Box, IBoxProps, HStack, Image, VStack, Center } from 'native-base'

import { Button } from '@/components'

export function FooterButtons({
  leftButton,
  leftPress,
  centerButton,
  centerPress,
  rightButton,
  rightPress,
  ...props
}: {
  leftPress?: () => void
  centerPress?: () => void
  rightPress?: () => void
  leftButton?: React.ReactNode
  centerButton?: React.ReactNode
  rightButton?: React.ReactNode
} & IBoxProps) {
  return (
    <>
      <Box>
        <HStack justifyContent={'space-between'} alignItems={'center'} {...props}>
          {leftButton || (
            <Button onPress={leftPress}>
              <VStack alignItems={'center'}>
                <Image
                  size={6}
                  source={require('@/assets/icons/phone.png')}
                  alt="phone"
                />
                <Box
                  _text={{
                    fontSize: 'xs',
                    color: '#266EFF',
                  }}>
                  联系报警人
                </Box>
              </VStack>
            </Button>
          )}

          {centerButton || (
            <Box>
              <Button
                isScale
                onPress={centerPress}
                style={{
                  elevation: 10,
                  shadowColor: '#FF2200',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.9,
                  shadowRadius: 10,
                }}>
                <Center
                  bg={'#FF2200'}
                  borderRadius={'full'}
                  px={4}
                  py={1}
                  _text={{
                    color: '#FFFFFF',
                    fontSize: 'lg',
                  }}>
                  立即接警
                </Center>
              </Button>
            </Box>
          )}

          {rightButton || (
            <Button onPress={rightPress}>
              <VStack alignItems={'center'}>
                <Image size={6} source={require('@/assets/icons/line.png')} alt="phone" />
                <Box
                  _text={{
                    fontSize: 'xs',
                    color: '#266EFF',
                  }}>
                  查看路线
                </Box>
              </VStack>
            </Button>
          )}
        </HStack>
      </Box>
    </>
  )
}
