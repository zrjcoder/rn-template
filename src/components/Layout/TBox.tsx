import React from 'react'
import { Box, IBoxProps } from 'native-base'

export type TBoxProps = {} & IBoxProps

export function TBox({ children, ...props }: TBoxProps) {
  return (
    <Box bg={'coolGray.100'} {...props}>
      {children}
    </Box>
  )
}
