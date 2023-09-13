import React from 'react'
import { Box, HStack, VStack, IBoxProps, ITextProps, Divider } from 'native-base'

export type InfoBoxProps = {
  data: Record<string, any>
  info: Record<string, string>
  infoStyle?: IBoxProps
  textStyle?: ITextProps
  rightStyle?: IBoxProps
  leftWidth?: string
  rightWidth?: string
  otherRightWidth?: any
  isDivider?: boolean
} & IBoxProps

export function InfoBox({
  data,
  info,
  textStyle,
  infoStyle,
  leftWidth = '27%',
  otherRightWidth = {},
  rightWidth = '75%',
  isDivider = false,
  rightStyle = {},
  ...props
}: InfoBoxProps) {
  const keys = Object.keys(info ?? {})

  if (keys?.length === 0) {
    return null
  }

  return (
    <Box {...props}>
      <VStack>
        {keys.map((key, index) => {
          return (
            <VStack key={key}>
              <HStack py={3} justifyContent={'flex-start'} {...infoStyle}>
                <Box
                  width={leftWidth}
                  flexDirection="row"
                  justifyContent="space-between"
                  _text={{
                    fontSize: 'sm',
                    color: '#999999',
                    ...textStyle,
                  }}>
                  {`${info[key]}：`}
                </Box>

                <Box
                  width={typeof data[key] === 'object' ? otherRightWidth : rightWidth}
                  maxWidth={rightWidth}
                  justifyContent={'center'}
                  {...rightStyle}
                  _text={{
                    fontSize: 'sm',
                    color: '#333333',
                    ...textStyle,
                  }}>
                  {data[key]}
                </Box>
              </HStack>

              {isDivider && index !== keys.length - 1 && <Divider />}
            </VStack>
          )
        })}
      </VStack>
    </Box>
  )
}
