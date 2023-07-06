import React from 'react'
import { Box, HStack, Heading, IBoxProps } from 'native-base'

import { Tag } from '@/components'

export type InfoHeaderProps = IBoxProps & {
  data: any
  tag?: string
  rightButton?: React.ReactNode
}

export function InfoHeader({ data, tag, rightButton, ...props }: InfoHeaderProps) {
  return (
    <Box mt={4} mb={4} {...props}>
      <HStack justifyContent={'space-between'}>
        <HStack>
          {tag && <Tag text={tag} mr={1} />}

          <Heading size="sm" mr={2}>
            {data?.title}
          </Heading>

          {data?.tags?.map((item) => (
            <Tag text={item?.label} mr={2} />
          ))}
        </HStack>

        <Box>{rightButton}</Box>
      </HStack>

      <HStack justifyContent={'space-between'} mt={2}>
        <Box
          _text={{
            fontSize: 'xs',
            color: '#999999',
          }}>
          {data?.text}
        </Box>
        <Box
          _text={{
            fontSize: 'xs',
            color: '#999999',
          }}>
          {data?.date}
        </Box>
      </HStack>
    </Box>
  )
}
