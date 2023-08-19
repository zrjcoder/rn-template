import React from 'react'
import { Box, HStack, VStack, IBoxProps, ITextProps, Divider } from 'native-base'

export function InfoBox({
  data,
  info,
  textStyle,
  infoStyle,
  isDivider = false,
  rightStyle = {},
  ...props
}: {
  data: Record<string, any>
  info: Record<string, string>
  infoStyle?: IBoxProps
  textStyle?: ITextProps
  rightStyle?: IBoxProps
  isDivider?: boolean
} & IBoxProps) {
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
              <HStack mt={2} justifyContent={'flex-start'} {...infoStyle}>
                <Box
                  width={'27%'}
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
                  width={'75%'}
                  maxWidth={'75%'}
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
