import React from 'react'
import { Box, VStack, HStack, Divider, Heading, IBoxProps } from 'native-base'

import { Card, type CardProps } from '@/components'

type TCardProps = {
  title: string
  topButton?: any
  headerStyle?: IBoxProps
} & CardProps

export function TCard({ title, topButton, headerStyle, children, ...props }: TCardProps) {
  return (
    <Card py={3} {...props}>
      <HStack alignItems={'center'} {...headerStyle}>
        <Divider
          mr={2}
          h={4}
          borderRadius={'xl'}
          thickness={4}
          bg={'#266EFF'}
          orientation="vertical"
        />
        <Heading fontSize={'md'}>{title}</Heading>

        <Box position={'absolute'} right={0}>
          {topButton}
        </Box>
      </HStack>

      <VStack>{children}</VStack>
    </Card>
  )
}

export function EmbedTCard({
  children,
  ...props
}: TCardProps & { children: React.ReactNode }) {
  return (
    <TCard
      headerStyle={{ mb: 0 }}
      mx={0}
      mt={0}
      px={0}
      pb={0}
      shadow={999}
      bg={{}}
      {...props}>
      {children}
    </TCard>
  )
}
