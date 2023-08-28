import React from 'react'
import { Box, HStack, Heading, IBoxProps } from 'native-base'

import { Tag, TBox } from '@/components'

export type InfoHeaderProps = IBoxProps & {
  data: any
  tag?: string
  status?: number
  isLoading?: boolean
  onPress?: Function
  rightButton?: React.ReactNode
  rightTag?: {
    label: string
    color: string
  }
}

export function InfoHeader({
  data,
  tag,
  status = 3,
  rightButton,
  onPress,
  rightTag,
  isLoading = false,
  ...props
}: InfoHeaderProps) {
  return (
    <TBox
      isLoading={isLoading}
      rightTag={rightTag}
      onPress={onPress}
      status={status}
      px={3}
      py={4}
      style={{
        borderRadius: 4,
      }}
      {...props}>
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
