import React from 'react'
import { Box, HStack, Heading, IBoxProps } from 'native-base'

import { Tag, TBox } from '@/components'

export type InfoHeaderProps = IBoxProps & {
  data: any
  tag?: string
  rightButton?: React.ReactNode
}

export function InfoHeader({ data, tag, rightButton, ...props }: InfoHeaderProps) {
  return (
    <TBox py={4} {...props}>
      <HStack justifyContent={'space-between'}>
        <HStack>
          {tag && <Tag text={tag} mr={1} />}

          <Heading size="sm" mr={2}>
            {data?.title}
          </Heading>

          {data?.tags?.map((item: any, index: any) => (
            <Tag key={index} text={item?.label} mr={2} />
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
    </TBox>
  )
}
