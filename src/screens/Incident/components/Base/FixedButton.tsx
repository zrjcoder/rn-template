import React from 'react'
import { Button, IButtonProps, Text } from 'native-base'

export const FixedButton = (props: IButtonProps) => {
  return (
    <Button
      _pressed={{
        bg: `#256EFF99`,
      }}
      alignItems={'center'}
      shadow={'8'}
      style={{
        shadowColor: '#256EFF',
      }}
      position={'absolute'}
      zIndex={999}
      bottom={10}
      right={0}
      mr={2}
      borderRadius={'full'}
      bg={'#266EFF'}
      size={'60px'}
      {...props}>
      <Text fontSize={'sm'} color="#FFFFFF">
        立即
      </Text>
      <Text fontSize={'sm'} color="#FFFFFF">
        处置
      </Text>
    </Button>
  )
}
