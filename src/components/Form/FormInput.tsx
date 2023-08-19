import React from 'react'
import { Box, Input, IInputProps } from 'native-base'
import { ViewProps } from 'react-native'

export type FormInputProps = {
  title: string
  height?: string
  style?: ViewProps
} & IInputProps

export function FormInput({
  title = '标题',
  style = {},
  height = '44px',
  ...props
}: FormInputProps) {
  return (
    <Box width={'100%'} style={style}>
      <Input
        height={height as string}
        InputLeftElement={
          <Box
            mr={2}
            flexDirection="row"
            justifyContent="space-between"
            _text={{
              fontSize: 'sm',
              color: '#333333',
            }}>
            {`${title}：`}
          </Box>
        }
        size={'sm'}
        pl={0}
        variant={'underlined'}
        {...props}
      />
    </Box>
  )
}
