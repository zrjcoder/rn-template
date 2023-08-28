import React from 'react'
import { StyledProps, Button, IButtonProps } from 'native-base'

const themeStyles = {
  alarm: {
    bg: '#FF2200',
    color: '#FFFFFF',
  },
  primary: {
    bg: '#266EFE',
    color: '#FFFFFF',
  },
  light: {
    bg: '#FFFFFF',
    color: '#266EFE',
    borderColor: '#266EFE',
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
        elevation: 5,
        shadowColor: themeStyle.bg,
      }}
      borderRadius={'full'}
      _text={{
        color: themeStyle.color ? themeStyle.color : '#FFFFFF',
        bold: true,
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
