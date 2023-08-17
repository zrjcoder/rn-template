import React from 'react'
import { Box, IBoxProps, HStack, Image, VStack, Center } from 'native-base'

import { Button } from '@/components'

export function FooterButtons({
  leftButton,
  leftPress,
  centerButton,
  rightButton,
  rightPress,
  ...props
}: {
  leftPress?: () => void
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

          {centerButton}

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
