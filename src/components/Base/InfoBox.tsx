import React from 'react'
import { Box, HStack, VStack, IBoxProps } from 'native-base'

export function InfoBox({
  data,
  info,
  textStyle,
  infoStyle,
  ...props
}: {
  data: Record<string, string>
  info: Record<string, string>
  infoStyle?: any
  textStyle?: any
} & IBoxProps) {
  const keys = Object.keys(info ?? {})

  return (
    <Box {...props}>
      <VStack>
        {keys.map((key) => {
          return (
            <HStack key={key} mt={2} justifyContent={'flex-start'} {...infoStyle}>
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
                _text={{
                  fontSize: 'sm',
                  color: '#333333',
                  ...textStyle,
                }}>
                {data[key]}
              </Box>
            </HStack>
          )
        })}
      </VStack>
    </Box>
  )
}
