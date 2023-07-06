import React from 'react'
import { Center, Text, StyledProps } from 'native-base'

import { Button, type ButtonProps } from '@/components'

const themeStyles = {
  alarm: {
    bg: '#FF2200',
    color: '#FFFFFF',
  },
  primary: {
    bg: '#266EFF',
    color: '#FFFFFF',
  },
  light: {
    bg: '#FFFFFF',
    color: '#266EFF',
    borderColor: '#266EFF',
    borderWidth: 1,
  },
}

export function TButton({
  theme = 'primary',
  children,
  containerStyle,
  textStyle,
  ...props
}: {
  theme?: 'primary' | 'alarm' | 'light'
  textStyle?: StyledProps
  containerStyle?: StyledProps
} & ButtonProps) {
  const themeStyle = themeStyles[theme]

  return (
    <Button
      isScale
      isPressedStyle={false}
      style={{
        elevation: 10,
        shadowColor: themeStyle.bg || '#FFFFFF',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,
      }}
      {...props}>
      <Center borderRadius={'full'} px={5} py={1} {...themeStyle} {...containerStyle}>
        <Text
          color={themeStyle.color ? themeStyle.color : '#FFFFFF'}
          fontSize={'md'}
          textAlign={'center'}
          {...textStyle}>
          {children}
        </Text>
      </Center>
    </Button>
  )
}
