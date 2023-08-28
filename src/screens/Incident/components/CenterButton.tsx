import React from 'react'
import { Button, type IButtonProps } from 'native-base'

export function CenterButton({
  children,
  ...props
}: {
  onPress?: () => void
} & IButtonProps) {
  return (
    <Button
      style={{
        elevation: 10,
        shadowColor: '#FF2200',
      }}
      bg={'#FF2200'}
      borderRadius={'full'}
      px={4}
      py={1}
      _text={{
        color: '#FFFFFF',
        fontSize: 'lg',
      }}
      _pressed={{
        bg: '#df2509',
      }}
      {...props}>
      {children}
    </Button>
  )
}
