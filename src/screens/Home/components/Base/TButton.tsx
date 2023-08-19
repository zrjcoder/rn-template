import React from 'react'
import { StyledProps, Button, IButtonProps } from 'native-base'

const themeStyles = {
  alarm: {
    bg: '#FF2200',
    color: '#FFFFFF',
  },
  primary: {
    bg: '#0C6AF9',
    color: '#FFFFFF',
  },
  light: {
    bg: '#FFFFFF',
    color: '#0C6AF9',
    borderColor: '#0C6AF9',
    borderWidth: 1,
  },
}

export function TButton({
  theme = 'primary',
  children,
  textStyle = {},
  ...props
}: {
  theme?: 'primary' | 'alarm' | 'light'
  textStyle?: StyledProps
  containerStyle?: StyledProps
} & IButtonProps) {
  const themeStyle = themeStyles[theme]

  return (
    <Button
      style={{
        elevation: 10,
        shadowColor: themeStyle.bg,
      }}
      borderRadius={'full'}
      _text={{
        color: themeStyle.color ? themeStyle.color : '#FFFFFF',
        ...textStyle,
      }}
      _pressed={{
        bg: `${themeStyle.bg}99`,
      }}
      {...themeStyle}
      {...props}
      bg={themeStyle.bg}>
      {children}
    </Button>
  )
}
