import React from 'react'
import { Pressable, IPressableProps, Box, IBoxProps } from 'native-base'

export type ButtonProps = {
  isScale?: boolean
  isPressedStyle?: boolean
  styles?: IBoxProps
  scale?: number
  children: any
} & IPressableProps

export function Button({
  children,
  styles,
  scale = 1.2,
  isPressedStyle = true,
  isScale = false,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      rounded="sm"
      zIndex={999}
      _pressed={
        isPressedStyle
          ? {
              bg: 'gray.200',
            }
          : {}
      }
      {...props}>
      {({ isPressed }) => (
        <Box
          style={
            isScale
              ? {
                  transform: [
                    {
                      scale: isPressed ? scale : 1,
                    },
                  ],
                }
              : null
          }
          {...styles}>
          {children}
        </Box>
      )}
    </Pressable>
  )
}
